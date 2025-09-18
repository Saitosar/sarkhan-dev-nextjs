import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { Pool } from "pg"
import { drizzle } from "drizzle-orm/node-postgres"
import * as schema from "../../../db/schema"
import EmailProvider from "next-auth/providers/email"

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

// Этот код полностью соответствует официальным рекомендациям
export default NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    EmailProvider({
      // Конфигурация для отправки через SMTP-сервер Resend
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.RESEND_API_KEY, // Используем API ключ как пароль
        },
      },
      // Адрес, с которого будут отправляться письма
      from: process.env.EMAIL_FROM,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
    error: '/auth/error',
  },
})