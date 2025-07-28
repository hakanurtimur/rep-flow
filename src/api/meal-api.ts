import api from "@/lib/axios-client";
import { CreateMealInPlanInput } from "@/zod-schemas/meal-schemas";

//POST
export const createMealInPlan = async (
  input: CreateMealInPlanInput,
): Promise<CreateMealInPlanInput> => {
  const res = await api.post("/meal/meal-in-plan", input);
  return res.data;
};
