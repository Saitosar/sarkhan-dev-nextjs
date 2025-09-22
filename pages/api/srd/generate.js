import { getServerSession } from "next-auth/next";
import NextAuth from "@/pages/api/auth/[...nextauth]";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../../../db/schema";
import { PLANS } from "../../../lib/plans";
import { sql, and, gte, eq } from "drizzle-orm";

// Создаем подключение к БД (аналогично вашему файлу [...nextauth].js)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
});
const db = drizzle(pool, { schema });


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const session = await getServerSession(req, res, NextAuth);

  if (!session || !session.user || !session.user.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userId = session.user.id;

  try {
    // --- НАЧАЛО НОВОЙ ЛОГИКИ ---

    // 1. Получаем полную информацию о пользователе из нашей БД, включая его тарифный план
    const user = await db.query.users.findFirst({
        where: eq(schema.users.id, userId),
    });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const plan = user.plan || 'free'; // Если план не указан, считаем его бесплатным
    const planLimits = PLANS[plan];

    // 2. Считаем, сколько SRD-документов пользователь создал за последний месяц
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const documentCountResult = await db.select({
        count: sql`count(*)::int`
    }).from(schema.documents).where(
        and(
            eq(schema.documents.createdBy, userId),
            eq(schema.documents.type, 'SRD'),
            gte(schema.documents.createdAt, startOfMonth)
        )
    );
    
    const count = documentCountResult[0].count;

    // 3. Проверяем, не превышен ли лимит
    if (count >= planLimits.monthlyDocs) {
        return res.status(429).json({ 
            error: `Monthly limit of ${planLimits.monthlyDocs} documents reached for the '${plan}' plan.` 
        });
    }

    // --- КОНЕЦ НОВОЙ ЛОГИКИ ---

    // Если все проверки пройдены, возвращаем успешный ответ
    res.status(200).json({ 
      message: `Success! User ${user.email} is authorized and within quota.`,
      usage: `${count + 1} / ${planLimits.monthlyDocs}`
    });

  } catch (error) {
    console.error("Error in SRD generation endpoint:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}