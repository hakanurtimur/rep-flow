import { prisma } from "@/lib/prisma";

// GET by date
export async function getNutritionPlanByDate(userId: string, date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return prisma.nutritionPlan.findFirst({
    where: {
      userId,
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    include: {
      meals: {
        include: {
          mealFood: {
            include: {
              food: true,
            },
          },
          calendarEvent: {
            select: {
              colorKey: true,
            },
          },
        },
        orderBy: { time: "asc" },
      },
    },
  });
}
