import { PrismaClient } from '@prisma/client/edge'

declare global {
  let prisma: PrismaClient | undefined;
}

export const db: PrismaClient = globalThis.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  (globalThis as any).prisma = db;
}
