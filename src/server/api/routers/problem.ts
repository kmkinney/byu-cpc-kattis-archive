import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const problemWithTags = Prisma.validator<Prisma.ProblemSelect>()({
  id: true,
  difficulty: true,
  title: true,
  problemTags: {
    select: {
      tag: true,
    },
  },
});

export const problemRouter = createTRPCRouter({
  allProblems: publicProcedure.query(async ({ ctx }) => {
    const problems = await ctx.db.problem.findMany({
      select: problemWithTags,
    });
    return problems.map((problem) => ({
      ...problem,
      tags: problem.problemTags.map((problemTag) => problemTag.tag),
    }));
  }),
  byId: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const problem = await ctx.db.problem.findUnique({
      where: { id: input },
      select: problemWithTags,
    });
    if (!problem) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Problem with id ${input} not found`,
      });
    }
    return {
      ...problem,
      tags: problem.problemTags.map((problemTag) => problemTag.tag),
    };
  }),
});
