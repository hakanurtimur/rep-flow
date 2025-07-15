import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllMuscleGroups = async (userId: string) => {
  return prisma.muscleGroup.findMany({
    where: {
      OR: [{ userId }, { userId: null }],
    },
    orderBy: { name: "asc" },
  });
};

export const createMuscleGroup = async (userId: string, name: string) => {
  return prisma.muscleGroup.create({
    data: {
      name,
      userId,
      isSystem: false,
    },
  });
};

export const deleteMuscleGroup = async (id: string, userId: string) => {
  return prisma.muscleGroup.deleteMany({
    where: {
      id,
      userId,
      isSystem: false,
    },
  });
};

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
