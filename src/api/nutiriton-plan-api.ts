import z from "zod";
import api from "@/lib/axios-client";
import { ExtendedNutritionPlan } from "@/zod-schemas/nutrition-plan-schemas";

const ParamsSchema = z.object({
  date: z.string(),
});

// GET by date
export const getNutritionPlanByDate = async (
  date: string,
): Promise<ExtendedNutritionPlan | null> => {
  const parsed = ParamsSchema.safeParse({ date });
  if (!parsed.success) throw new Error("Invalid date format");

  const res = await api.get<ExtendedNutritionPlan>(
    `/nutrition-plan/by-date?date=${encodeURIComponent(date)}`,
  );

  return res.data;
};
