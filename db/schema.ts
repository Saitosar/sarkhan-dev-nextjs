import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
  uuid,
  boolean,
} from "drizzle-orm/pg-core"
import type { AdapterAccount } from "@auth/core/adapters"

// --- ENUMS (перечисления для ролей, статусов и т.д.) ---

export const userRoleEnum = pgEnum('user_role', ['owner', 'admin', 'editor', 'viewer']);
export const planEnum = pgEnum('plan', ['free', 'pro', 'expert', 'enterprise']);
export const statusEnum = pgEnum('status', ['active', 'invited', 'inactive']);
export const ownerTypeEnum = pgEnum('owner_type', ['user', 'organization']);
export const visibilityEnum = pgEnum('visibility', ['private', 'link', 'public', 'org']);


// --- CORE AUTH TABLES (для NextAuth.js) ---

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  plan: planEnum('plan').default('free'),
  status: statusEnum('status').default('active'),
  createdAt: timestamp('createdAt').defaultNow(),
})

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
  })
)

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
)

// --- B2B / Organization Tables ---

export const organizations = pgTable("organization", {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    plan: planEnum('plan').default('free'),
    status: statusEnum('status').default('active'),
    createdAt: timestamp('createdAt').defaultNow(),
    // Политики организации
    disablePublicLinks: boolean('disablePublicLinks').default(false),
});

export const memberships = pgTable("membership", {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
    organizationId: uuid('organizationId').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
    role: userRoleEnum('role').default('viewer'),
});

// --- Documents Table ---

export const documents = pgTable("document", {
    id: uuid('id').defaultRandom().primaryKey(),
    title: text('title').notNull(),
    content: text('content'), // JSON or text content

    // Владелец (может быть пользователь ИЛИ организация)
    ownerType: ownerTypeEnum('ownerType').notNull(),
    ownerId: text('ownerId').notNull(), // Ссылается на users.id или organizations.id

    // Автор документа
    createdBy: text('createdBy').notNull().references(() => users.id),

    // Настройки доступа
    visibility: visibilityEnum('visibility').default('private'),

    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
});