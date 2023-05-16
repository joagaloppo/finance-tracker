import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const transactionRouter = createTRPCRouter({
  getTen: publicProcedure
    .input(z.object({ walletId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.transaction.findMany({
        where: { walletId: input.walletId },
        take: 10,
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
});
