import { prisma } from "@/lib/prisma";

export async function getWorkoutTemplates(userId: string) {
  return prisma.workoutTemplate.findMany({
    where: {
      OR: [{ userId }, { userId: null }],
    },
    select: {
      id: true,
      name: true,
      description: true,
      difficulty: true,
      duration: true,
      isSystem: true,
      templateExercises: {
        select: {
          id: true,
          exercise: {
            select: { name: true },
          },
          sets: {
            select: { id: true },
          },
        },
      },
    },
  });
}
