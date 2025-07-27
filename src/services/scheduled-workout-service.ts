import { prisma } from "@/lib/prisma";
import {
  CreateScheduledWorkoutInput,
  UpdateScheduledWorkoutInput,
  UpdateScheduledWorkoutStatusInput,
} from "@/zod-schemas/scheduled-workout-schemas";
import { AppError } from "@/lib/app-error";

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
      calendarEvent: {
        select: {
          id: true,
          date: true,
          colorKey: true,
        },
      },
      workoutSession: {
        where: {
          isActive: true,
        },
        select: {
          id: true,
          isPaused: true,
          currentStep: true,
          durationElapsed: true,
          startedAt: true,
        },
        take: 1,
      },
    },
    orderBy: [
      { completed: "asc" },
      {
        scheduledAt: "asc",
      },
    ],
  });
}

// POST
export async function createScheduledWorkout(
  userId: string,
  input: CreateScheduledWorkoutInput,
) {
  return prisma.$transaction(async (tx) => {
    const calendarEvent = await tx.calendarEvent.create({
      data: {
        userId,
        date: input.scheduledAt,
        type: "WORKOUT",
        workoutId: input.workoutId,
        colorKey: input.colorKey ?? null,
      },
    });

    return tx.scheduledWorkout.create({
      data: {
        workoutId: input.workoutId,
        userId,
        scheduledAt: input.scheduledAt,
        calendarEventId: calendarEvent.id,
      },
    });
  });
}

// PUT
export async function updateScheduledWorkout(
  userId: string,
  id: string,
  input: UpdateScheduledWorkoutInput,
) {
  return prisma.$transaction(async (tx) => {
    const existing = await tx.scheduledWorkout.findFirst({
      where: {
        id,
        userId,
      },
      select: {
        calendarEventId: true,
      },
    });

    if (!existing || !existing.calendarEventId) {
      throw new Error("Scheduled workout not found or missing calendar event");
    }

    await tx.calendarEvent.update({
      where: {
        id: existing.calendarEventId,
      },
      data: {
        date: input.scheduledAt,
        colorKey: input.colorKey ?? null,
      },
    });

    return tx.scheduledWorkout.update({
      where: {
        id,
      },
      data: {
        scheduledAt: input.scheduledAt,
        workoutId: input.workoutId,
      },
    });
  });
}

// DELETE
export async function deleteScheduledWorkout(id: string) {
  return prisma.$transaction(async (tx) => {
    const scheduledWorkout = await tx.scheduledWorkout.findUnique({
      where: { id },
      include: {
        calendarEvent: true,
      },
    });

    if (!scheduledWorkout) {
      throw new AppError("Scheduled workout not found.", "NOT_FOUND");
    }

    await tx.scheduledWorkout.delete({
      where: { id },
    });

    if (scheduledWorkout.calendarEventId) {
      await tx.calendarEvent.delete({
        where: {
          id: scheduledWorkout.calendarEventId,
        },
      });
    }

    return { success: true };
  });
}

// PATCH completion status
export async function updateScheduledWorkoutStatus(
  userId: string,
  id: string,
  input: UpdateScheduledWorkoutStatusInput,
) {
  const scheduledWorkout = await prisma.scheduledWorkout.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!scheduledWorkout) {
    const error: any = new Error("Scheduled workout not found");
    error.code = "NOT_FOUND";
    throw error;
  }

  return prisma.scheduledWorkout.update({
    where: { id },
    data: {
      completed: input.completed,
    },
  });
}
