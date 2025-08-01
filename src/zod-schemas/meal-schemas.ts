import { z } from "zod";
import { eventColorKeyEnum } from "@/zod-schemas/scheduled-workout-schemas";
import { CalendarEventSchema } from "@/zod-schemas/calendar-event-schemas";

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

export const FoodSchema = z.object({
  id: z.string(),
  name: z.string(),
  calories: z.number(),
  protein: z.number(),
  fat: z.number(),
  carbs: z.number(),
});
export type Food = z.infer<typeof FoodSchema>;

export const MealFoodSchema = z.object({
  id: z.string(),
  amount: z.number(),
  food: FoodSchema,
});
export type MealFood = z.infer<typeof MealFoodSchema>;

export const MealWithDetailsSchema = z.object({
  id: z.string(),
  type: z.string(),
  time: z.string().or(z.date()),
  description: z.string().nullable().optional(),
  calendarEvent: CalendarEventSchema,
  mealFood: z.array(MealFoodSchema),
});
export type MealWithDetails = z.infer<typeof MealWithDetailsSchema>;

export const UpdateMealInputSchema = z.object({
  id: z.string(),
  type: z.enum(["BREAKFAST", "LUNCH", "DINNER", "SNACK"]),
  time: z.string().or(z.date()),
  description: z.string().nullable().optional(),
  colorKey: z.string().nullable().optional(),
  mealFoods: z.array(
    z.object({
      food: z.object({
        id: z.string(),
      }),
      amount: z.number().min(0),
    }),
  ),
});

export type UpdateMealInput = z.infer<typeof UpdateMealInputSchema>;
