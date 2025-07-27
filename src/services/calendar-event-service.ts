import { prisma } from "@/lib/prisma";

export async function getCalendarEvents(userId: string) {
  return prisma.calendarEvent.findMany({
    where: {
      userId,
    },
    include: {
      workout: {
        select: {
          id: true,
          name: true,
          description: true,
        },
      },
      scheduledWorkout: {
        select: {
          id: true,
          scheduledAt: true,
          completed: true,
        },
      },
      meal: {
        select: {
          id: true,
          type: true,
          time: true,
          description: true,
          nutritionPlan: {
            select: {
              date: true,
            },
          },
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  });
}
