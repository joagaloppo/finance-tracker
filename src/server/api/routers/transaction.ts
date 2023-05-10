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
  getTen: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.transaction.findMany({
      where: { walletId: { in: ["1"] } },
      take: 30,
      orderBy: { date: "desc" },
    });
  }),
});
