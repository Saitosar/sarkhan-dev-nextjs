// pages/api/account.js

import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../../db/schema";
import { eq, and, desc } from "drizzle-orm";
import { promises as fs } from 'fs';
import path from 'path';

async function getDb() {
    const certPath = path.resolve(process.cwd(), 'certs', 'supabase.crt');
    const caCert = await fs.readFile(certPath, 'utf-8');
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: true, ca: caCert }
    });
    return drizzle(pool, { schema });
}

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user || !session.user.id) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const db = await getDb();
    const userId = session.user.id;

    // --- ОБРАБОТКА GET-ЗАПРОСА ---
    if (req.method === 'GET') {
        try {
            // 1. Получаем данные пользователя
            const user = await db.query.users.findFirst({
                where: eq(schema.users.id, userId),
                columns: {
                    name: true,
                    email: true,
                }
            });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // 2. Получаем документы пользователя
            const documents = await db.query.documents.findMany({
                where: and(
                    eq(schema.documents.ownerId, userId),
                    eq(schema.documents.type, 'SRD')
                ),
                columns: {
                    id: true,
                    title: true,
                    createdAt: true,
                },
                orderBy: [desc(schema.documents.createdAt)]
            });

            res.status(200).json({ user, documents });

        } catch (error) {
            console.error("API GET /api/account Error:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    // --- ОБРАБОТКА PUT-ЗАПРОСА ---
    else if (req.method === 'PUT') {
        try {
            const { name } = req.body;

            // Валидация
            if (!name || typeof name !== 'string' || name.trim().length === 0) {
                return res.status(400).json({ error: 'Name is required.' });
            }

            await db.update(schema.users)
                .set({ name: name.trim() })
                .where(eq(schema.users.id, userId));

            res.status(200).json({ message: 'Profile updated successfully.' });

        } catch (error) {
            console.error("API PUT /api/account Error:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    // --- Обработка других методов ---
    else {
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}