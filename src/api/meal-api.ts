import api from "@/lib/axios-client";
import {
  CreateMealInPlanInput,
  MealWithDetails,
  UpdateMealInput,
} from "@/zod-schemas/meal-schemas";

//POST
export const createMealInPlan = async (
  input: CreateMealInPlanInput,
): Promise<CreateMealInPlanInput> => {
  const res = await api.post("/meal/meal-in-plan", input);
  return res.data;
};

// GET BY ID
export const getMealById = async (id: string): Promise<MealWithDetails> => {
  const res = await api.get<MealWithDetails>(`meal/${id}`);
  return res.data;
};

// PUT
export const updateMeal = async (
  input: UpdateMealInput,
): Promise<UpdateMealInput> => {
  console.log(input);

  const res = await api.put(`meal/${input.id}`, input);
  return res.data;
};
