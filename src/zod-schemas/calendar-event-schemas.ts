import { z } from "zod";

export const CalendarEventSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.enum(["WORKOUT", "NUTRITION"]),
  date: z.coerce.date(),
  workoutId: z.string().nullable(),
  nutritionId: z.string().nullable(),
  colorKey: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),

  workout: z
    .object({
      id: z.string(),
      name: z.string(),
      description: z.string().optional().nullable(),
    })
    .nullable(),

  nutrition: z
    .object({
      id: z.string(),
      description: z.string().nullable(),
    })
    .nullable(),

  scheduledWorkout: z
    .object({
      id: z.string(),
      scheduledAt: z.coerce.date(),
    })
    .nullable(),
});

export type CalendarEventListElement = z.infer<typeof CalendarEventSchema>;
