import { problemRouter } from "~/server/api/routers/problem";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  problem: problemRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
