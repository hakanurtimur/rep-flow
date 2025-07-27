import api from "@/lib/axios-client";
import { FoodInput } from "@/zod-schemas/food-schemas";

export const createFood = async (data: FoodInput) => {
  const res = await api.post("food/import", data);
  return res.data;
};
