import { PrismaClient } from "@prisma/client";
import { verifyToken } from "./utils/auth";

export const prisma = new PrismaClient();

export interface GraphQLContext {
  prisma: PrismaClient;
  userId: string | null;
}

export async function buildContext({ req }: { req: any }): Promise<GraphQLContext> {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const payload = token ? verifyToken(token) : null;

  return {
    prisma,
    userId: payload?.userId ?? null,
  };
}

export function requireAuth(ctx: GraphQLContext): string {
  if (!ctx.userId) {
    throw new Error("Not authenticated");
  }
  return ctx.userId;
}
