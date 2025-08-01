import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFood } from "@/api/food-api";
import { FoodInput } from "@/zod-schemas/food-schemas";

interface UseCreateFoodOptions {
  onSuccess?: (data: FoodInput) => void;
}

export const useCreateFood = ({ onSuccess }: UseCreateFoodOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFood,
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["foods"] }),
        queryClient.invalidateQueries({ queryKey: ["food-options"] }),
      ]);
      onSuccess?.(data);
    },
  });
};
