import { prisma } from "@/lib/prisma";

export const completeOnboarding = async (
  userId: string,
  {
    firstName,
    lastName,
    age,
    weight,
    weightUnit,
    height,
    heightUnit,
    fitnessGoal,
    activityLevel,
    notes,
  }: {
    firstName?: string;
    lastName?: string;
    age?: number;
    weight?: number;
    weightUnit?: string;
    height?: number;
    heightUnit?: string;
    fitnessGoal?: string;
    activityLevel?: string;
    notes?: string;
  },
) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      firstName,
      lastName,
      age,
      weight,
      weightUnit,
      height,
      heightUnit,
      fitnessGoal,
      activityLevel,
      notes,
      onboarded: true,
    },
  });
};
