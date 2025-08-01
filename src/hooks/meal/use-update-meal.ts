import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMeal } from "@/api/meal-api";
import { toast } from "sonner";

export const useUpdateMeal = ({ onSuccess = () => {} }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMeal,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["calendar-events"] });
      await queryClient.invalidateQueries({ queryKey: ["nutrition-plans"] });
      await queryClient.invalidateQueries({ queryKey: ["meal", data.id] });
      onSuccess();
    },
    onError: (err) => {
      toast.error("Failed to update meal in plan.");
      console.error(err);
    },
  });
};
