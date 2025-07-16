import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMuscleGroup } from "@/api/muscle-group-api";
import { toast } from "sonner";

export const useCreateMuscleGroup = ({ onSuccess = () => {} }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMuscleGroup,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["muscle-groups"] });
      onSuccess();
    },
    onError: (err) => {
      toast(err.message);
    },
  });
};
