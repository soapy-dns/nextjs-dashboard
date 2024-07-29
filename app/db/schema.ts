import { date, integer, pgTable, serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core"

// https://orm.drizzle.team/learn/tutorials/drizzle-with-supabase
// npx drizzle-kit generate
// npx drizzle-kit migrate

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull()
})

export type InsertUser = typeof usersTable.$inferInsert
export type SelectUser = typeof usersTable.$inferSelect

export const customersTable = pgTable("customers", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  image_url: text("image_url").notNull()
})

export type InsertCustomer = typeof customersTable.$inferInsert
export type SelectCustomer = typeof customersTable.$inferSelect

export const invoicesTable = pgTable("invoices", {
  id: uuid("id").defaultRandom().primaryKey(),
  customer_id: uuid("customer_id")
    .references(() => customersTable.id)
    .notNull(),
  amount: integer("amount").notNull(),
  status: text("status").notNull(),
  date: date("date").notNull()
})

export type InsertInvoice = typeof invoicesTable.$inferInsert
export type SelectInvoice = typeof invoicesTable.$inferSelect

export const revenueTable = pgTable("revenues", {
  month: varchar("month", { length: 4 }).notNull().unique(),
  revenue: integer("revenue").notNull()
})

export type InsertRevenue = typeof revenueTable.$inferInsert
export type SelectRevenue = typeof revenueTable.$inferSelect
