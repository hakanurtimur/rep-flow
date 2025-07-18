import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMuscleGroup } from "@/api/muscle-group-api";
import { toast } from "sonner";

export const useUpdateMuscleGroup = ({ onSuccess = () => {} }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMuscleGroup,
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
