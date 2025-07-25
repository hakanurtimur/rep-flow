import { prisma } from "@/lib/prisma";

// GET
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
      nutrition: {
        select: {
          id: true,
          description: true,
        },
      },
      scheduledWorkout: {
        select: {
          id: true,
          scheduledAt: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  });
}
