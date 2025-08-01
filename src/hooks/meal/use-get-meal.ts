import { useQuery } from "@tanstack/react-query";
import { MealWithDetails } from "@/zod-schemas/meal-schemas";
import { getMealById } from "@/api/meal-api";

export const useGetMeal = (id: string) => {
  return useQuery<MealWithDetails>({
    queryKey: ["meal", id],
    queryFn: async () => await getMealById(id),
  });
};
