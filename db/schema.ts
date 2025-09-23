import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
  uuid,
  boolean,
  jsonb, // Импортируем jsonb для нового поля
} from "drizzle-orm/pg-core"
import type { AdapterAccount } from "@auth/core/adapters"

// --- ENUMS (перечисления для ролей, статусов и т.д.) ---

export const userRoleEnum = pgEnum('user_role', ['owner', 'admin', 'editor', 'viewer']);
export const planEnum = pgEnum('plan', ['free', 'pro', 'expert', 'enterprise']);
export const statusEnum = pgEnum('status', ['active', 'invited', 'inactive']);
export const ownerTypeEnum = pgEnum('owner_type', ['user', 'organization']);
export const visibilityEnum = pgEnum('visibility', ['private', 'link', 'public', 'org']);

// --- НОВЫЕ ENUMS ДЛЯ ДОКУМЕНТОВ ---
export const documentTypeEnum = pgEnum('document_type', ['SRD', 'general']);
export const documentStatusEnum = pgEnum('document_status', ['draft', 'published']);


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
    disablePublicLinks: boolean('disablePublicLinks').default(false),
});

export const memberships = pgTable("membership", {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
    organizationId: uuid('organizationId').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
    role: userRoleEnum('role').default('viewer'),
});

// --- Documents Table (ОБНОВЛЕННАЯ ВЕРСИЯ) ---

export const documents = pgTable("document", {
    id: uuid('id').defaultRandom().primaryKey(),
    title: text('title').notNull(),
    
    // СТАРОЕ ПОЛЕ content ОСТАЕТСЯ ДЛЯ ОБРАТНОЙ СОВМЕСТИМОСТИ, НО МЫ БУДЕМ ИСПОЛЬЗОВАТЬ НОВЫЕ
    content: text('content'),

    // НОВЫЕ ПОЛЯ ДЛЯ SRD
    type: documentTypeEnum('type').default('general'),
    status: documentStatusEnum('status').default('draft'),
    content_json: jsonb('content_json'), // Для структурированных данных
    content_md: text('content_md'), // Для Markdown
    version: integer('version').default(1),

    // Владелец (может быть пользователь ИЛИ организация)
    ownerType: ownerTypeEnum('ownerType'),
    ownerId: text('ownerId'), // Ссылается на users.id или organizations.id

    // Автор документа
    createdBy: text('createdBy'),

    // Настройки доступа
    visibility: visibilityEnum('visibility').default('private'),

    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow(),
});