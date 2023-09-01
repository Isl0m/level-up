import { InferModel, relations } from "drizzle-orm"
import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core"
import { AdapterAccount } from "next-auth/adapters"

import { db } from "."

export const roleEnum = pgEnum("role", ["user", "admin"])

export const users = pgTable("users", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  surname: text("surname"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  password: text("password"),
  image: text("image"),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
})

export type User = InferModel<typeof users>
export type UserRole = User["role"]
export type NewUser = InferModel<typeof users, "insert">

export const courses = pgTable("courses", {
  id: text("id").notNull().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  rating: integer("rating"),
  reviews: integer("reviews"),
  price: integer("price"),
  image: text("image"),
  createdAt: timestamp("createdAt").defaultNow(),
})

export type Course = InferModel<typeof courses>

export const courseRelations = relations(courses, ({ many }) => ({
  lectures: many(lectures),
}))

export const lectures = pgTable("lectures", {
  id: text("id").notNull().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  video: text("video"),
  duration: integer("duration"),
  courseId: text("courseId")
    .notNull()
    .references(() => courses.id),
})

export type Lecture = InferModel<typeof lectures>

export const lectureRelations = relations(lectures, ({ one }) => ({
  course: one(courses, {
    fields: [lectures.courseId],
    references: [courses.id],
  }),
}))

export const accounts = pgTable(
  "accounts",
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
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
)

export const sessions = pgTable("sessions", {
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
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
)
