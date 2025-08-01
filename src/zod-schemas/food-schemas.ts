import { z } from "zod";

export const FoodSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  calories: z.number().nonnegative(),
  protein: z.number().nonnegative(),
  carbs: z.number().nonnegative(),
  fat: z.number().nonnegative(),
});

export type FoodInput = z.infer<typeof FoodSchema>;

export const ExternalFoodSchema = z.object({
  fdcId: z.number(),
  description: z.string(),
  foodNutrients: z.array(
    z.object({
      nutrientName: z.string(),
      value: z.number().optional(),
    }),
  ),
});

export type ExternalFood = z.infer<typeof ExternalFoodSchema>;

export const SearchedFoodSchema = z.object({
  id: z.string().optional(),
  fdcId: z.number().optional(),
  name: z.string(),
  source: z.enum(["internal", "external"]),
  calories: z.number().optional(),
  protein: z.number().optional(),
  fat: z.number().optional(),
  carbs: z.number().optional(),
});

export const SearchFoodQuerySchema = z.object({
  query: z.string().min(1),
});

export type SearchedFood = z.infer<typeof SearchedFoodSchema>;
