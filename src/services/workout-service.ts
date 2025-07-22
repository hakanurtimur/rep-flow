import { prisma } from "@/lib/prisma";

// GET
export async function getWorkouts(userId: string) {
  return prisma.workout.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      difficulty: true,
      duration: true,
      createdAt: true,
      templates: {
        select: {
          template: {
            select: {
              id: true,
              name: true,
              isSystem: true,
            },
          },
        },
      },
      exercises: {
        select: {
          id: true,
          exercise: {
            select: {
              name: true,
            },
          },
          sets: {
            select: {
              id: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
