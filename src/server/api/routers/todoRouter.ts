import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { prisma } from "~/server/db";

export const TodoRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ todo: z.string() }))
    .mutation(({ ctx, input }) => {
      return prisma.todos.create({
        data: {
          todo: input.todo,
          userId: ctx.session.user.id
        }
      });
    }),
  getAll: protectedProcedure
    .query(({ ctx }) => {
      return prisma.todos.findMany({
        where: {
          userId: ctx.session.user.id
        }
      })
    }),
  toggleCheck: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const row = await prisma.todos.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id
        }
      })
      if (row === null)
        return;
      return prisma.todos.update({
        where: {
          id: input.id
        },
        data: {
          isChecked: !row.isChecked
        }
      })
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      const row = prisma.todos.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id
        }
      })
      if (row === null)
        return;
      return prisma.todos.delete({
        where: {
          id: input.id
        }
      })
    })
})