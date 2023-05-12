import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const transactionRouter = createTRPCRouter({
  // hello: publicProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`,
  //     };
  //   }),
  getTen: publicProcedure.query(async ({ ctx }) => {
    const ownerId = ctx.userId;

    if (!ownerId) {
      throw new Error("User not authenticated");
    }

    const wallets = await ctx.prisma.wallet.findMany({
      where: { ownerId },
      select: { id: true },
    });

    const walletsArray = wallets.map((wallet) => wallet.id);

    return ctx.prisma.transaction.findMany({
      where: { walletId: { in: walletsArray } },
      take: 30,
      orderBy: { date: "desc" },
    });
  }),
});
