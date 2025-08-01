import { AppError } from "@/lib/app-error";
import { prisma } from "@/lib/prisma";
import {
  CreateMealInPlanInput,
  UpdateMealInput,
} from "@/zod-schemas/meal-schemas";

// POST
export async function createMealInPlan(
  userId: string,
  input: CreateMealInPlanInput,
) {
  const { date, time, type, description, colorKey } = input;

  return prisma.$transaction(async (tx) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    let plan = await tx.nutritionPlan.findFirst({
      where: {
        userId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    if (!plan) {
      plan = await tx.nutritionPlan.create({
        data: {
          userId,
          date: startOfDay,
        },
      });
    }

    const calendarEvent = await tx.calendarEvent.create({
      data: {
        userId,
        type: "NUTRITION",
        date: time,
        colorKey: colorKey ?? null,
      },
    });

    return tx.meal.create({
      data: {
        nutritionPlanId: plan.id,
        type,
        time,
        description,
        calendarEventId: calendarEvent.id,
      },
    });
  });
}

// GET by id
export async function getMealById(userId: string, mealId: string) {
  const meal = await prisma.meal.findFirst({
    where: {
      id: mealId,
      nutritionPlan: {
        userId,
      },
    },
    include: {
      calendarEvent: true,
      nutritionPlan: true,
      mealFood: {
        include: {
          food: true,
        },
      },
    },
  });

  if (!meal) {
    throw new AppError("Meal not found or access denied", 404);
  }

  return meal;
}

// PUT
export async function updateMeal(
  userId: string,
  id: string,
  input: UpdateMealInput,
) {
  const { type, time, description, colorKey, mealFoods } = input;

  return prisma.$transaction(async (tx) => {
    const meal = await tx.meal.findUnique({
      where: { id },
      include: { calendarEvent: true },
    });

    if (!meal) {
      throw new AppError("Meal not found", 404);
    }

    if (meal.calendarEvent?.userId !== userId) {
      throw new AppError("Unauthorized access", 403);
    }

    await tx.calendarEvent.update({
      where: { id: meal.calendarEventId! },
      data: {
        date: new Date(time),
        colorKey: colorKey ?? null,
      },
    });

    await tx.meal.update({
      where: { id },
      data: {
        type,
        time: new Date(time),
        description,
      },
    });

    await tx.mealFood.deleteMany({
      where: { mealId: id },
    });

    if (mealFoods.length > 0) {
      console.log(mealFoods);
      await tx.mealFood.createMany({
        data: mealFoods.map((mf) => ({
          mealId: id,
          foodId: mf.food.id,
          amount: mf.amount,
        })),
      });
    }

    return { success: true };
  });
}
