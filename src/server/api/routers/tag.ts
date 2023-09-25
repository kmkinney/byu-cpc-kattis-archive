import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const tagRouter = createTRPCRouter({
  tagProblem: publicProcedure
    .input(
      z.object({
        problemId: z.string(),
        tagId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.problemTag.create({
        data: {
          ...input,
        },
      });
    }),
});
