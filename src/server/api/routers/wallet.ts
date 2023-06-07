import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "@/server/api/trpc";
import { Currency } from "@prisma/client";

export const walletRouter = createTRPCRouter({
  getAll: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.wallet.findMany({ where: { ownerId: ctx.userId } });
  }),
  getInfo: privateProcedure
    .input(
      z.object({
        walletId: z.number(),
        search: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const wallet = await ctx.prisma.wallet.findUnique({ where: { id: input.walletId } });
      if (!wallet) throw new Error("Wallet not found");

      const count = await ctx.prisma.transaction.count({
        where: { walletId: input.walletId, description: { contains: input.search } },
      });

      const balance = await ctx.prisma.transaction
        .aggregate({ where: { walletId: input.walletId }, _sum: { amount: true } })
        .then((res) => res._sum.amount ?? 0);

      return { count, balance, wallet };
    }),
  create: privateProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        currency: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const transaction = await ctx.prisma.wallet.create({
        data: {
          name: input.name,
          description: input.description,
          currency: Currency[input.currency as keyof typeof Currency],
          ownerId: ctx.userId,
        },
      });

      return transaction;
    }),
  edit: privateProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.optional(z.string()),
        description: z.optional(z.string()),
        currency: z.optional(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const transaction = await ctx.prisma.wallet.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
          currency: Currency[input.currency as keyof typeof Currency],
        },
      });

      return transaction;
    }),
  delete: privateProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.transaction.deleteMany({ where: { walletId: input.id } });
      const deleted = await ctx.prisma.wallet.delete({ where: { id: input.id } });

      return deleted;
    }),
});
