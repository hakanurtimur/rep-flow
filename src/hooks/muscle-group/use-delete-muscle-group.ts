import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMuscleGroup } from "@/api/muscle-group-api";
import { toast } from "sonner";

export const useDeleteMuscleGroup = ({ onSuccess = () => {} }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMuscleGroup,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["muscle-groups"] });
      onSuccess();
    },
    onError: (err) => {
      toast(err.message);
    },
  });
};
