import { createTRPCRouter } from "@/server/api/trpc";
import { walletRouter } from "./routers/wallet";
import { transactionRouter } from "./routers/transaction";


/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  wallet: walletRouter,
  transaction: transactionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
