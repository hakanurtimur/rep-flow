import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMuscleGroup } from "@/api/muscle-group-api";
import { toast } from "sonner";

export const useDeleteMuscleGroup = ({ onSuccess = () => {} }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMuscleGroup,
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
