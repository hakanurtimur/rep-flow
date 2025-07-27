import { z } from "zod";

export const CalendarEventSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.enum(["WORKOUT", "NUTRITION"]),
  date: z.coerce.date(),
  workoutId: z.string().nullable(),
  mealId: z.string().nullable(),
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

  meal: z
    .object({
      id: z.string(),
      type: z.enum(["BREAKFAST", "LUNCH", "DINNER", "SNACK"]),
      time: z.coerce.date().nullable(),
      description: z.string().nullable(),
      nutritionPlan: z.object({
        date: z.coerce.date(),
      }),
    })
    .nullable(),

  scheduledWorkout: z
    .object({
      id: z.string(),
      scheduledAt: z.coerce.date(),
      completed: z.boolean(),
    })
    .nullable(),
});

export type CalendarEventListElement = z.infer<typeof CalendarEventSchema>;
