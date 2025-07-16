import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMuscleGroup } from "@/api/muscle-group-api";
import { toast } from "sonner";

export const useUpdateMuscleGroup = ({ onSuccess = () => {} }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMuscleGroup,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["muscle-groups"] });
      onSuccess();
    },
    onError: (err) => {
      toast(err.message);
    },
  });
};
