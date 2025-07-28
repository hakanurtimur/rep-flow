import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMealInPlan } from "@/api/meal-api";
import { toast } from "sonner";

export const useCreateMealInPlan = ({ onSuccess = () => {} }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMealInPlan,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["calendar-events"] });
      await queryClient.invalidateQueries({ queryKey: ["nutrition-plans"] });
      await queryClient.invalidateQueries({
        queryKey: ["nutrition-plans", data.date],
      });
      onSuccess();
    },
    onError: (err) => {
      toast.error("Failed to create meal in plan.");
      console.error(err);
    },
  });
};
