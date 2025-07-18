import { prisma } from "@/lib/prisma";
import type {
  CreateExerciseInput,
  UpdateExerciseInput,
} from "@/zod-schemas/exercise-schemas";

// GET
export const getExercises = async (userId: string) => {
  return prisma.exercise.findMany({
    where: {
      OR: [{ userId }, { userId: null }],
    },
    orderBy: { name: "asc" },
    include: {
      muscleGroupLinks: {
        include: {
          muscleGroup: true,
        },
      },
    },
  });
};

// POST
export const createExercise = async (
  input: CreateExerciseInput,
  userId: string,
) => {
  return prisma.$transaction(async (tx) => {
    const exercise = await tx.exercise.create({
      data: {
        name: input.name,
        description: input.description,
        totalDifficulty: input.totalDifficulty,
        userId,
        isSystem: false,
      },
    });

    await tx.exerciseMuscleGroup.createMany({
      data: input.muscleGroups.map((mg) => ({
        exerciseId: exercise.id,
        muscleGroupId: mg.muscleGroupId,
        difficulty: mg.difficulty,
      })),
    });

    return exercise;
  });
};

// GET BY ID
export const getExerciseById = async (id: string, userId: string) => {
  return prisma.exercise.findFirst({
    where: {
      id,
      OR: [{ userId }, { userId: null }],
    },
    include: {
      muscleGroupLinks: {
        include: {
          muscleGroup: true,
        },
      },
    },
  });
};

// PUT

export const updateExercise = async (
  id: string,
  userId: string,
  input: UpdateExerciseInput,
) => {
  const existing = await prisma.exercise.findFirst({
    where: {
      id,
      OR: [{ userId }, { userId: null }],
    },
  });

  if (!existing) {
    throw new Error("Exercise not found or unauthorized");
  }

  if (existing.userId === null) {
    throw new Error("System exercises cannot be updated");
  }

  return prisma.$transaction(async (tx) => {
    const updatedExercise = await tx.exercise.update({
      where: { id },
      data: {
        name: input.name,
        description: input.description,
        totalDifficulty: input.totalDifficulty,
      },
    });

    await tx.exerciseMuscleGroup.deleteMany({
      where: { exerciseId: id },
    });

    await tx.exerciseMuscleGroup.createMany({
      data: input.muscleGroups!.map((mg) => ({
        exerciseId: id,
        muscleGroupId: mg.muscleGroupId,
        difficulty: mg.difficulty,
      })),
    });

    return updatedExercise;
  });
};

export const deleteExercise = async (id: string, userId: string) => {
  const exercise = await prisma.exercise.findFirst({
    where: {
      id,
      OR: [{ userId }, { userId: null }],
    },
  });

  if (!exercise) {
    throw new Error("Exercise not found or unauthorized");
  }

  if (exercise.userId === null) {
    throw new Error("System exercises cannot be deleted");
  }

  return prisma.$transaction(async (tx) => {
    await tx.exerciseMuscleGroup.deleteMany({
      where: {
        exerciseId: id,
      },
    });

    await tx.exercise.delete({
      where: {
        id,
      },
    });
  });
};
