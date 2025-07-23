import { prisma } from "@/lib/prisma";
import { CreateScheduledWorkoutInput } from "@/zod-schemas/scheduled-workout-schemas";

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
