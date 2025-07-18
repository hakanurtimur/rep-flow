import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMuscleGroup } from "@/api/muscle-group-api";
import { toast } from "sonner";

export const useCreateMuscleGroup = ({ onSuccess = () => {} }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMuscleGroup,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["muscle-groups"] }),
        queryClient.invalidateQueries({ queryKey: ["muscle-group-options"] }),
      ]);
      onSuccess();
    },
    onError: (err) => {
      toast(err.message);
    },
  });
};
