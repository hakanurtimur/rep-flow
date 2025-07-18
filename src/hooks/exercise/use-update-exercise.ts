import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateExercise } from "@/api/exercise-api";

export const useUpdateExercise = ({ onSuccess = () => {} }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateExercise,
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["exercise", data.id] }),
        queryClient.invalidateQueries({ queryKey: ["exercise"] }),
        queryClient.invalidateQueries({ queryKey: ["exercises"] }),
      ]);
      onSuccess();
    },
    onError: (err) => {
      toast(err.message);
    },
  });
};
