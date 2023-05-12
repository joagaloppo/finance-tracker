import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const walletRouter = createTRPCRouter({
  // hello: publicProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`,
  //     };
  //   }),
  getAll: publicProcedure.query(({ ctx }) => {
    const ownerId = ctx.userId;

    if (!ownerId) {
      throw new Error("User not authenticated");
    }

    return ctx.prisma.wallet.findMany({ where: { ownerId }});
  }),
});
