import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "@/server/api/trpc";

export const transactionRouter = createTRPCRouter({
  getTen: publicProcedure
    .input(z.object({ walletId: z.number(), search: z.string().optional(), skip: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.transaction.findMany({
        where: { walletId: input.walletId, description: { contains: input.search } },
        take: 10,
        skip: input.skip,
        orderBy: { date: "desc" },
      });
    }),
  create: privateProcedure
    .input(
      z.object({
        description: z.string(),
        amount: z.number(),
        date: z.date(),
        walletId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const transaction = await ctx.prisma.transaction.create({
        data: {
          description: input.description,
          amount: input.amount,
          date: input.date,
          walletId: input.walletId,
        },
      });

      return transaction;
    }),
  update: privateProcedure
    .input(
      z.object({
        id: z.number(),
        description: z.string(),
        amount: z.number(),
        date: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const transaction = await ctx.prisma.transaction.update({
        where: { id: input.id },
        data: {
          description: input.description,
          amount: input.amount,
          date: input.date,
        },
      });

      return transaction;
    }),
  delete: privateProcedure.input(z.object({ id: z.number() })).mutation(async ({ ctx, input }) => {
    const transaction = await ctx.prisma.transaction.delete({
      where: { id: input.id },
    });

    return transaction;
  }),
});
