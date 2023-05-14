import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const walletRouter = createTRPCRouter({
  getAll: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.wallet.findMany({ where: { ownerId: ctx.userId } });
  }),
  getBalance: publicProcedure
    .input(z.object({ walletId: z.number() }))
    .query(async ({ ctx, input }) => {
      const wallet = await ctx.prisma.wallet.findUnique({
        where: { id: input.walletId },
      });
      if (!wallet) throw new Error("Wallet not found");

      const balance = await ctx.prisma.transaction
        .aggregate({
          where: { walletId: input.walletId },
          _sum: { amount: true },
        })
        .then((res) => res._sum.amount ?? 0);

      return { balance, wallet };
    }),
});
