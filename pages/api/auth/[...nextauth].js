import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { Pool } from "pg"
import { drizzle } from "drizzle-orm/node-postgres"
import * as schema from "../../../db/schema"
import EmailProvider from "next-auth/providers/email"
import { Resend } from "resend" // 1. Импортируем Resend

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });
const resend = new Resend(process.env.RESEND_API_KEY); // 2. Создаем клиент Resend

export default NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    EmailProvider({
      // 3. Создаем свою функцию отправки, используя логику из вашего примера
      async sendVerificationRequest({ identifier: email, url, provider }) {
        try {
          await resend.emails.send({
            from: provider.from,
            to: email,
            subject: "Sign in to Sarkhan.dev",
            html: `<p>Click the magic link below to sign in to your account.</p><p><a href="${url}">Sign In</a></p>`,
          });
          console.log("Verification email sent to", email);
        } catch (error) {
          console.error("Failed to send verification email:", error);
          throw new Error("Failed to send verification email");
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
    error: '/auth/error',
  },
})