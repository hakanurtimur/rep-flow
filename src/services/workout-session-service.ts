// src/services/workout-session-service.ts
import { prisma } from "@/lib/prisma";
import { AppError } from "@/lib/app-error";
import {
  UpdateWorkoutSessionInput,
  WorkoutSessionSession,
  WorkoutSessionWorkout,
  WorkoutSessionWorkoutExercise,
  WorkoutSessionWorkoutExerciseSet,
} from "@/zod-schemas/workout-session-schemas";

// GET
export async function getWorkoutSessionWithWorkout(
  sessionId: string,
  userId: string,
): Promise<{
  session: WorkoutSessionSession;
  workout: WorkoutSessionWorkout;
}> {
  const session = await prisma.workoutSession.findFirst({
    where: {
      id: sessionId,
      userId,
    },
    include: {
      workout: {
        include: {
          exercises: {
            include: {
              sets: true,
              exercise: {
                select: {
                  name: true,
                  description: true,
                },
              },
            },
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  if (!session) {
    throw new AppError("Workout session not found", "SESSION_NOT_FOUND");
  }

  const sessionData: WorkoutSessionSession = {
    id: session.id,
    userId: session.userId,
    workoutId: session.workoutId,
    scheduledWorkoutId: session.scheduledWorkoutId ?? undefined,
    currentStep: session.currentStep,
    durationElapsed: session.durationElapsed,
    isPaused: session.isPaused,
    isActive: session.isActive,
    startedAt: session.startedAt.toISOString(),
    endedAt: session.endedAt?.toISOString(),
  };

  const workoutData: WorkoutSessionWorkout = {
    id: session.workout.id,
    name: session.workout.name,
    description: session.workout.description ?? undefined,
    duration: session.workout.duration,
    difficulty: session.workout.difficulty,
    exercises: session.workout.exercises.map(
      (we): WorkoutSessionWorkoutExercise => ({
        id: we.id,
        order: we.order,
        exercise: {
          name: we.exercise.name,
          description: we.exercise.description ?? undefined,
        },
        sets: we.sets.map(
          (set): WorkoutSessionWorkoutExerciseSet => ({
            reps: set.reps,
            weight: set.weight || 0,
            restTime: set.restTime || 0,
            duration: set.duration || 30,
            order: set.order,
          }),
        ),
      }),
    ),
  };

  return {
    session: sessionData,
    workout: workoutData,
  };
}

// POST
export async function startWorkoutSession(
  userId: string,
  scheduledWorkoutId: string,
) {
  const scheduled = await prisma.scheduledWorkout.findUnique({
    where: { id: scheduledWorkoutId },
    select: {
      id: true,
      workoutId: true,
    },
  });

  console.log(scheduled);
  if (!scheduled) {
    throw new AppError(
      "Scheduled workout not found",
      "SCHEDULED_ERROR_NOT_FOUND",
    );
  }

  const existing = await prisma.workoutSession.findFirst({
    where: {
      userId,
      workoutId: scheduled.workoutId,
      scheduledWorkoutId: scheduled.id,
      isActive: true,
    },
  });

  if (existing) return existing;

  return await prisma.workoutSession.create({
    data: {
      userId,
      workoutId: scheduled.workoutId,
      scheduledWorkoutId: scheduled.id,
    },
  });
}

// PATCH
export async function updateWorkoutSession(
  userId: string,
  input: UpdateWorkoutSessionInput,
) {
  const { id, ...data } = input;

  console.log(id);

  const existing = await prisma.workoutSession.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!existing) {
    throw new AppError("Workout session not found", "SESSION_NOT_FOUND");
  }

  return await prisma.workoutSession.update({
    where: { id },
    data,
  });
}
