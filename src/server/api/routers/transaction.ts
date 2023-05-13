import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

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
});
