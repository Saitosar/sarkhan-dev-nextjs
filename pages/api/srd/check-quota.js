// pages/api/srd/check-quota.js

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../../../db/schema";
import { PLANS } from "../../../lib/plans";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { and, eq, gte } from "drizzle-orm";
import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user || !session.user.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const certPath = path.resolve(process.cwd(), 'certs', 'supabase.crt');
    const caCert = await fs.readFile(certPath, 'utf-8');
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: true, ca: caCert }
    });
    const db = drizzle(pool, { schema });

    const user = await db.query.users.findFirst({
        where: eq(schema.users.id, session.user.id),
    });

    const userPlan = user?.plan || 'free';
    const planDetails = PLANS[userPlan];
    const monthlyLimit = planDetails.monthlyDocs;

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const documentsCount = await db
      .select({ id: schema.documents.id })
      .from(schema.documents)
      .where(
        and(
          eq(schema.documents.ownerId, session.user.id),
          eq(schema.documents.type, 'SRD'),
          gte(schema.documents.createdAt, startOfMonth)
        )
      )
      .then(res => res.length);

    const hasQuota = documentsCount < monthlyLimit;

    res.status(200).json({
      hasQuota,
      used: documentsCount,
      limit: monthlyLimit,
      plan: userPlan,
    });

  } catch (error) {
    console.error("Quota check error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}