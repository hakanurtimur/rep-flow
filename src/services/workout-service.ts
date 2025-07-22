import { prisma } from "@/lib/prisma";
import { CreateWorkoutInput } from "@/zod-schemas/workout-schemas";

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

// POST
export async function createWorkout(userId: string, input: CreateWorkoutInput) {
  return prisma.$transaction(async (tx) => {
    const workout = await tx.workout.create({
      data: {
        name: input.name,
        description: input.description,
        difficulty: input.difficulty,
        duration: input.duration,
        userId,
      },
    });

    if (input.templateIds && input.templateIds.length > 0) {
      await tx.workoutTemplateOnWorkout.createMany({
        data: input.templateIds.map((templateId) => ({
          workoutId: workout.id,
          templateId,
        })),
      });
    }

    for (const ex of input.exercises) {
      const workoutExercise = await tx.workoutExercise.create({
        data: {
          workoutId: workout.id,
          exerciseId: ex.exerciseId,
          order: ex.order,
        },
      });

      if (ex.sets.length > 0) {
        await tx.workoutExerciseSet.createMany({
          data: ex.sets.map((set) => ({
            workoutExerciseId: workoutExercise.id,
            reps: set.reps,
            weight: set.weight,
            duration: set.duration,
            restTime: set.restTime,
            order: set.order,
          })),
        });
      }
    }

    return workout;
  });
}
