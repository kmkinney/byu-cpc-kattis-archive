import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { fetchProblemHtml, parseProblem } from "../services/problemParser";

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
  addByUrl: publicProcedure
    .input(z.string().url())
    .mutation(async ({ input, ctx }) => {
      const url = new URL(input);
      const id = url.pathname.split("/").pop();
      if (!id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Invalid url ${input}`,
        });
      }
      const html = await fetchProblemHtml(input);
      const { difficulty, title, body } = parseProblem(html);
      return await ctx.db.problem.create({
        data: {
          id,
          difficulty,
          title,
          body,
        },
      });
    }),
});
