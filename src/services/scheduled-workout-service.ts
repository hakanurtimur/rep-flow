import { prisma } from "@/lib/prisma";
import { CreateScheduledWorkoutInput } from "@/zod-schemas/scheduled-workout-schemas";

// GET
export async function getScheduledWorkouts(userId: string) {
  return prisma.scheduledWorkout.findMany({
    where: {
      userId,
    },
    include: {
      workout: {
        select: {
          id: true,
          name: true,
          description: true,
          duration: true,
          difficulty: true,
        },
      },
    },
    orderBy: {
      scheduledAt: "asc",
    },
  });
}

// POST
export async function createScheduledWorkout(
  userId: string,
  input: CreateScheduledWorkoutInput,
) {
  return prisma.$transaction(async (tx) => {
    const scheduledWorkout = await tx.scheduledWorkout.create({
      data: {
        workoutId: input.workoutId,
        userId,
        scheduledAt: input.scheduledAt,
      },
    });

    await tx.calendarEvent.create({
      data: {
        userId,
        date: input.scheduledAt,
        type: "WORKOUT",
        workoutId: input.workoutId,
        colorKey: input.colorKey ?? null,
      },
    });

    return scheduledWorkout;
  });
}
