
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { prisma } from "~/server/db";

export const TodoNotesRouter = createTRPCRouter({
  createNote: protectedProcedure
    .input(z.object({ todoId: z.string(), note: z.string() }))
    .mutation(({ ctx, input }) => {
      //verify if the user is the owner of the todo
      const row = prisma.todos.findFirst({
        where: {
          id: input.todoId,
          userId: ctx.session.user.id
        }
      })
      if (row === null)
        return;
      return prisma.todoNotes.create({
        data: {
          note: input.note,
          todoId: input.todoId
        }
      })
    }),
  deleteNote: protectedProcedure
    .input(z.object({ noteId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      //verify if the user is the owner of the todo
      const todo = await prisma.todoNotes.findFirst({
        where: {
          id: input.noteId
        },
        select: {
          todoId: true
        }
      })
      if (!todo)
        return;
      const row = prisma.todos.findFirst({
        where: {
          id: todo.todoId,
          userId: ctx.session.user.id
        }
      })
      if (row === null)
        return;

      return prisma.todoNotes.delete({
        where: {
          id: input.noteId
        }
      })
    }),
  getNotes: protectedProcedure
    .input(z.object({ todoId: z.string() }))
    .query(({ ctx, input }) => {
      //verify if the user is the owner of the todo
      const row = prisma.todos.findFirst({
        where: {
          id: input.todoId,
          userId: ctx.session.user.id
        }
      })
      if (row === null)
        return;
      return prisma.todoNotes.findMany({
        where: {
          todoId: input.todoId
        }
      })
    }),
  modifyNote: protectedProcedure
    .input(z.object({ noteId: z.string(), note: z.string() }))
    .mutation(async ({ ctx, input }) => {
      //verify if the user is the owner of the todo
      const todo = await prisma.todoNotes.findFirst({
        where: {
          id: input.noteId
        },
        select: {
          todoId: true
        }
      })
      if (!todo)
        return;
      const row = prisma.todos.findFirst({
        where: {
          id: todo.todoId,
          userId: ctx.session.user.id
        }
      })
      if (row === null)
        return;

      return prisma.todoNotes.update({
        where: {
          id: input.noteId
        },
        data: {
          note: input.note
        }
      })
    })
})