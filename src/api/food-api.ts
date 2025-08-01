import api from "@/lib/axios-client";
import { FoodInput, SearchedFood } from "@/zod-schemas/food-schemas";
import { Food } from "@prisma/client";

// POST
export const createFood = async (data: FoodInput) => {
  const res = await api.post("food/import", data);
  return res.data;
};

// GET by search query
export async function searchFoods(query: string) {
  const res = await api.get<SearchedFood[]>(
    `food/search?query=${encodeURIComponent(query)}`,
  );
  return res.data;
}

// GET by id
export const getFoodById = async (id: string): Promise<Food> => {
  const res = await api.get<Food>(`food/${id}`);
  return res.data;
};
