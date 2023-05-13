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
  getTen: publicProcedure
    .input(z.object({ walletId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.transaction.findMany({
        where: { walletId: input.walletId },
        take: 10,
        orderBy: { date: "desc" },
      });
    }),
});
