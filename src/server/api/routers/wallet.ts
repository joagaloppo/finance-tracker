import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const walletRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    const ownerId = ctx.userId;

    if (!ownerId) {
      throw new Error("User not authenticated");
    }

    return ctx.prisma.wallet.findMany({ where: { ownerId } });
  }),
  getBalance: publicProcedure
    .input(z.object({ walletId: z.number() }))
    .query(({ ctx, input }) => {
      const ownerId = ctx.userId;

      if (!ownerId) {
        throw new Error("User not authenticated");
      }

      return ctx.prisma.transaction.aggregate({
        where: { walletId: input.walletId },
        _sum: { amount: true },
      });
    }),
});
