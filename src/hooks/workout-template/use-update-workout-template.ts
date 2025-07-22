import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateWorkoutTemplate } from "@/api/workout-template-api";

export const useUpdateWorkoutTemplate = ({ onSuccess = () => {} }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateWorkoutTemplate,
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["workout-template", data.id],
        }),
        queryClient.invalidateQueries({ queryKey: ["workout-template"] }),
        queryClient.invalidateQueries({ queryKey: ["workout-templates"] }),
        queryClient.invalidateQueries({
          queryKey: ["workout-template-options"],
        }),
      ]);
      onSuccess();
    },
    onError: (err) => {
      toast(err.message);
    },
  });
};
