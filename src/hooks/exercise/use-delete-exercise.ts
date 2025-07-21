import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteExercise } from "@/api/exercise-api";

export const useDeleteExercise = ({ onSuccess = () => {} }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExercise,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["exercises"] }),
        queryClient.invalidateQueries({ queryKey: ["exercises-options"] }),
      ]);
      onSuccess();
    },
    onError: (err) => {
      toast(err.message);
    },
  });
};
