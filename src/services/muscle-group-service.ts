import { AppError } from "@/lib/app-error";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET
export const getAllMuscleGroups = async (userId: string) => {
  return prisma.muscleGroup.findMany({
    where: {
      OR: [{ userId }, { userId: null }],
    },
    orderBy: { name: "asc" },
  });
};

// POST
export const createMuscleGroup = async (userId: string, name: string) => {
  return prisma.muscleGroup.create({
    data: {
      name,
      userId,
      isSystem: false,
    },
  });
};

// PUT
export const updateMuscleGroup = async (
  id: string,
  userId: string,
  name: string,
) => {
  return prisma.muscleGroup.updateMany({
    where: {
      id,
      userId,
      isSystem: false,
    },
    data: {
      name,
    },
  });
};

// DELETE
export const deleteMuscleGroup = async (id: string, userId: string) => {
  const relatedExercises = await prisma.exerciseMuscleGroup.findMany({
    where: { muscleGroupId: id },
    include: {
      exercise: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (relatedExercises.length > 0) {
    const names = relatedExercises.map((e) => e.exercise.name);
    const uniqueNames = [...new Set(names)];
    throw new AppError(
      `This muscle group is used in ${uniqueNames.length} exercises: ${uniqueNames.join(", ")}. Please delete it from related exercises before delete the muscle group`,
      "MUSCLE_GROUP_IN_USE",
    );
  }

  return prisma.muscleGroup.deleteMany({
    where: {
      id,
      userId,
      isSystem: false,
    },
  });
};

//GET as options

export const getMuscleGroupOptions = async (userId: string) => {
  return prisma.muscleGroup.findMany({
    where: {
      OR: [{ userId }, { userId: null }],
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });
};
