import { pgTable, serial, text, integer, boolean, doublePrecision } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { createInsertSchema } from 'drizzle-zod';

// User model (for future use with authentication)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
});

// Receipt related schemas
export const receiptItems = z.object({
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export const storeInfo = z.object({
  storeName: z.string(),
  storeNumber: z.string(),
  storePhone: z.string(),
  storeAddress: z.string(),
  storeLocation: z.string(),
  storeManager: z.string(),
  logoUrl: z.string(),
});

export const receiptInfo = z.object({
  receiptDate: z.string(),
  receiptTime: z.string(),
  transactionId: z.string(),
  paymentMethod: z.string(),
  taxRate: z.number(),
  cashierName: z.string(),
  items: z.array(receiptItems),
  storeInfo: storeInfo,
  receiptType: z.enum(["paper", "email"])
});

export type ReceiptItem = z.infer<typeof receiptItems>;
export type StoreInfo = z.infer<typeof storeInfo>;
export type ReceiptInfo = z.infer<typeof receiptInfo>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
