import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createExercise } from "@/api/exercise-api";

export const useCreateExercise = ({ onSuccess = () => {} }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExercise,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["exercises"] }),
      ]);
      onSuccess();
    },
    onError: (err) => {
      toast(err.message);
    },
  });
};
