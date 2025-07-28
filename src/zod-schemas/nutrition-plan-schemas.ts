import { z } from "zod";
import { MealForNutritionPlanSchema } from "@/zod-schemas/meal-schemas";

export const ExtendedNutritionPlanSchema = z.object({
  id: z.string(),
  userId: z.string(),
  date: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  meals: z.array(MealForNutritionPlanSchema),
});

export type ExtendedNutritionPlan = z.infer<typeof ExtendedNutritionPlanSchema>;
