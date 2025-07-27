import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFood } from "@/api/food-api";

export const useCreateFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFood,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["foods"] }),
        queryClient.invalidateQueries({ queryKey: ["food-options"] }),
      ]);
    },
  });
};
