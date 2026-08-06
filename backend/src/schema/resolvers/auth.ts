import { GraphQLContext } from "../../context";
import { hashPassword, verifyPassword, signToken } from "../../utils/auth";

export const authResolvers = {
  Query: {
    me: async (_: unknown, __: unknown, ctx: GraphQLContext) => {
      if (!ctx.userId) return null;
      return ctx.prisma.user.findUnique({ where: { id: ctx.userId } });
    },
  },
  Mutation: {
    register: async (
      _: unknown,
      args: { email: string; password: string; displayName: string },
      ctx: GraphQLContext
    ) => {
      const existing = await ctx.prisma.user.findUnique({ where: { email: args.email } });
      if (existing) throw new Error("An account with this email already exists");

      const passwordHash = await hashPassword(args.password);
      const user = await ctx.prisma.user.create({
        data: { email: args.email, passwordHash, displayName: args.displayName },
      });

      return { token: signToken({ userId: user.id }), user };
    },

    login: async (
      _: unknown,
      args: { email: string; password: string },
      ctx: GraphQLContext
    ) => {
      const user = await ctx.prisma.user.findUnique({ where: { email: args.email } });
      if (!user) throw new Error("Invalid email or password");

      const valid = await verifyPassword(args.password, user.passwordHash);
      if (!valid) throw new Error("Invalid email or password");

      return { token: signToken({ userId: user.id }), user };
    },
  },
};
