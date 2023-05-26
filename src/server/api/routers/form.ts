import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const formRouter = createTRPCRouter({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  create: publicProcedure.mutation(async ({ ctx }) => {
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.picture.findMany();
  }),
});


