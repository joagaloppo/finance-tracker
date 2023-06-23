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
  upsert: privateProcedure
    .input(
      z.object({
        walletId: z.number().optional(),
        name: z.string(),
        description: z.string().optional(),
        currency: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.walletId != null) {
        const wallet = await ctx.prisma.wallet.update({
          where: { id: input.walletId },
          data: {
            name: input.name,
            description: input.description,
            currency: Currency[input.currency as keyof typeof Currency],
          },
        });
        return wallet;
      } else {
        const wallet = await ctx.prisma.wallet.create({
          data: {
            ownerId: ctx.userId,
            name: input.name,
            description: input.description,
            currency: Currency[input.currency as keyof typeof Currency],
          },
        });
        return wallet;
      }
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
