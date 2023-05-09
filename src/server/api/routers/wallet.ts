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
    return ctx.prisma.wallet.findMany({ where: { ownerId: "user_2PYsIek8k5ZdFjBjL9KOnaypaI4" }});
  }),
});
