// pages/api/auth/[...nextauth].js (ФИНАЛЬНАЯ ИСПРАВЛЕННАЯ ВЕРСИЯ)
import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../../../db/schema";
import EmailProvider from "next-auth/providers/email";

// --- НАЧАЛО ИСПРАВЛЕНИЙ ---
import { promises as fs } from 'fs';
import path from 'path';

// Эта функция асинхронная, чтобы мы могли прочитать сертификат
async function getDb() {
    const certPath = path.resolve(process.cwd(), 'certs', 'supabase.crt');
    const caCert = await fs.readFile(certPath, 'utf-8');

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: true,
            ca: caCert,
        }
    });

    return drizzle(pool, { schema });
}

const db = await getDb();
// --- КОНЕЦ ИСПРАВЛЕНИЙ ---


export const authOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.RESEND_API_KEY,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
    error: '/auth/error',
  },

  callbacks: {
    async session({ session, user }) {
      // Добавляем ID пользователя в объект сессии
      if (session.user) {
        session.user.id = user.id;
        session.user.name = user.name;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);