import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const imageRouter = createTRPCRouter({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  create: publicProcedure.mutation(async ({ ctx }) => {

  }),
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const picture = await ctx.prisma.picture.findFirst({ where: {id: input.id} });
      return picture;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.picture.findMany();
  }),
});


