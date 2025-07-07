import { PrismaClient } from "../generated/prisma";

// Create a singleton instance of Prisma Client
const db = new PrismaClient();

export default db;
