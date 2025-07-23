import { prisma } from "@/lib/prisma";
import {
  CreateWorkoutTemplateInput,
  UpdateWorkoutTemplateInput,
} from "@/zod-schemas/workout-template-schemas";

// GET
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

// GET BY ID
export async function getWorkoutTemplateById(id: string, userId: string) {
  return prisma.workoutTemplate.findFirst({
    where: {
      AND: [{ id }, { OR: [{ userId }, { userId: null }] }],
    },
    include: {
      templateExercises: {
        include: {
          exercise: {
            include: {
              muscleGroupLinks: {
                include: { muscleGroup: true },
              },
            },
          },
          sets: true,
        },
      },
    },
  });
}

// PUT
export async function updateWorkoutTemplate(
  userId: string,
  id: string,
  data: UpdateWorkoutTemplateInput,
) {
  return prisma.$transaction(async (tx) => {
    await tx.workoutTemplate.update({
      where: {
        id_userId: {
          id,
          userId,
        },
      },
      data: {
        name: data.name,
        description: data.description,
        duration: data.duration,
        difficulty: data.difficulty,
      },
    });

    const oldExercises = await tx.templateExercise.findMany({
      where: { templateId: id },
      select: { id: true },
    });

    const oldExerciseIds = oldExercises.map((e) => e.id);

    await tx.templateExerciseSet.deleteMany({
      where: {
        templateExerciseId: { in: oldExerciseIds },
      },
    });

    await tx.templateExercise.deleteMany({
      where: {
        templateId: id,
      },
    });

    for (const te of data.templateExercises) {
      const newTE = await tx.templateExercise.create({
        data: {
          templateId: id,
          exerciseId: te.exerciseId,
          order: te.order,
        },
      });

      for (const set of te.sets) {
        await tx.templateExerciseSet.create({
          data: {
            templateExerciseId: newTE.id,
            reps: set.reps,
            weight: set.weight,
            duration: set.duration,
            restTime: set.restTime,
            order: set.order,
          },
        });
      }
    }

    return { success: true };
  });
}

// POST
export async function createWorkoutTemplate(
  userId: string,
  data: CreateWorkoutTemplateInput,
) {
  return prisma.$transaction(async (tx) => {
    const workoutTemplate = await tx.workoutTemplate.create({
      data: {
        userId,
        name: data.name,
        description: data.description,
        duration: data.duration,
        difficulty: data.difficulty,
      },
    });

    for (const te of data.templateExercises) {
      const newTE = await tx.templateExercise.create({
        data: {
          templateId: workoutTemplate.id,
          exerciseId: te.exerciseId,
          order: te.order,
        },
      });

      for (const set of te.sets) {
        await tx.templateExerciseSet.create({
          data: {
            templateExerciseId: newTE.id,
            reps: set.reps,
            weight: set.weight,
            duration: set.duration,
            restTime: set.restTime,
            order: set.order,
          },
        });
      }
    }

    return { success: true, id: workoutTemplate.id };
  });
}

//DELETE
export async function deleteWorkoutTemplate(
  templateId: string,
  userId: string,
) {
  await prisma.workoutTemplate.delete({
    where: {
      id_userId: {
        id: templateId,
        userId,
      },
    },
  });

  return { success: true };
}

// GET as options
export async function getWorkoutTemplateOptions(userId: string) {
  const templates = await prisma.workoutTemplate.findMany({
    where: {
      OR: [{ userId }, { userId: null }],
    },
    select: {
      id: true,
      name: true,
      description: true,
      duration: true,
      difficulty: true,
      isSystem: true,
      _count: {
        select: {
          templateExercises: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return templates.map((template) => ({
    id: template.id,
    name: template.name,
    description: template.description,
    duration: template.duration,
    difficulty: template.difficulty,
    isSystem: template.isSystem,
    exerciseCount: template._count.templateExercises,
  }));
}

//GET multiple with details
export async function getWorkoutTemplatesWithDetails(
  templateIds: string[],
  userId: string,
) {
  return prisma.workoutTemplate.findMany({
    where: {
      AND: [
        { id: { in: templateIds } },
        { OR: [{ userId }, { userId: null }] },
      ],
    },
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
          sets: true,
        },
      },
    },
  });
}
