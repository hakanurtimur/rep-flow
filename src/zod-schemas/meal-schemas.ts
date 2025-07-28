import { z } from "zod";
import { eventColorKeyEnum } from "@/zod-schemas/scheduled-workout-schemas";

export const CreateMealInPlanSchema = z.object({
  date: z.coerce.date(),
  time: z.coerce.date(),
  type: z.enum(["BREAKFAST", "LUNCH", "DINNER", "SNACK"]),
  description: z.string().optional().nullable(),
  colorKey: eventColorKeyEnum.optional(),
});

export type CreateMealInPlanInput = z.infer<typeof CreateMealInPlanSchema>;

export const MealForNutritionPlanSchema = z.object({
  id: z.string(),
  nutritionPlanId: z.string(),
  calendarEventId: z.string().nullable(),
  type: z.enum(["BREAKFAST", "LUNCH", "DINNER", "SNACK"]),
  time: z.coerce.date(),
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  calendarEvent: z
    .object({
      colorKey: z.string().nullable(),
    })
    .nullable(),
  mealFood: z.array(
    z.object({
      id: z.string(),
      mealId: z.string(),
      foodId: z.string(),
      amount: z.number(),
      unit: z.string().nullable(),
      food: z.object({
        id: z.string(),
        name: z.string(),
        calories: z.number(),
        protein: z.number(),
        carbs: z.number(),
        fat: z.number(),
        createdAt: z.coerce.date(),
        updatedAt: z.coerce.date(),
      }),
    }),
  ),
});

export type MealForNutritionPlan = z.infer<typeof MealForNutritionPlanSchema>;
