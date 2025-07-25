import { prisma } from "@/lib/prisma";
import {
  CreateWorkoutInput,
  UpdateWorkoutInput,
} from "@/zod-schemas/workout-schemas";
import { AppError } from "@/lib/app-error";

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

// GET BY ID
export async function getWorkoutById(userId: string, id: string) {
  return prisma.workout.findUnique({
    where: {
      id_userId: {
        id,
        userId,
      },
    },
    include: {
      exercises: {
        orderBy: { order: "asc" },
        include: {
          exercise: {
            include: {
              muscleGroupLinks: {
                include: {
                  muscleGroup: true,
                },
              },
            },
          },
          sets: {
            orderBy: { order: "asc" },
          },
        },
      },
      templates: {
        include: {
          template: {
            include: {
              templateExercises: {
                orderBy: { order: "asc" },
                include: {
                  exercise: {
                    include: {
                      muscleGroupLinks: {
                        include: {
                          muscleGroup: true,
                        },
                      },
                    },
                  },
                  sets: {
                    orderBy: { order: "asc" },
                  },
                },
              },
            },
          },
        },
      },
      scheduledWorkouts: true,
      CalendarEvent: true,
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
}

//PUT
export async function updateWorkout(
  userId: string,
  workoutId: string,
  input: UpdateWorkoutInput,
) {
  return prisma.$transaction(async (tx) => {
    const updatedWorkout = await tx.workout.update({
      where: {
        id: workoutId,
        userId,
      },
      data: {
        name: input.name,
        description: input.description,
        difficulty: input.difficulty,
        duration: input.duration,
      },
    });

    await tx.workoutTemplateOnWorkout.deleteMany({
      where: { workoutId },
    });

    if (input.templateIds && input.templateIds.length > 0) {
      await tx.workoutTemplateOnWorkout.createMany({
        data: input.templateIds.map((templateId) => ({
          workoutId,
          templateId,
        })),
      });
    }

    const existingWorkoutExercises = await tx.workoutExercise.findMany({
      where: { workoutId },
      select: { id: true },
    });

    const workoutExerciseIds = existingWorkoutExercises.map((we) => we.id);

    if (workoutExerciseIds.length > 0) {
      await tx.workoutExerciseSet.deleteMany({
        where: { workoutExerciseId: { in: workoutExerciseIds } },
      });

      await tx.workoutExercise.deleteMany({
        where: { id: { in: workoutExerciseIds } },
      });
    }

    for (const ex of input.exercises) {
      const workoutExercise = await tx.workoutExercise.create({
        data: {
          workoutId,
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

    return updatedWorkout;
  });
}

// DELETE
export const deleteWorkout = async (id: string, userId: string) => {
  const scheduled = await prisma.scheduledWorkout.findFirst({
    where: {
      workoutId: id,
    },
    select: {
      id: true,
    },
  });

  const calendar = await prisma.calendarEvent.findFirst({
    where: { workoutId: id },
  });

  if (scheduled || calendar) {
    throw new AppError(
      "This workout is scheduled. Please cancel the schedule before deleting the workout.",
      "WORKOUT_SCHEDULED",
    );
  }

  return prisma.workout.delete({
    where: {
      id_userId: {
        id,
        userId,
      },
    },
  });
};

// GET as options
export async function getWorkoutOptions(userId: string) {
  return prisma.workout.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
