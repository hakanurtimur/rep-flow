import { prisma } from "@/lib/prisma";
import { CreateMealInPlanInput } from "@/zod-schemas/meal-schemas";

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
