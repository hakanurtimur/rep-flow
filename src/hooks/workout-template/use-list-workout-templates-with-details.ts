import { useMutation } from "@tanstack/react-query";
import { getWorkoutTemplatesWithDetails } from "@/api/workout-template-api";
import { ExtendedWorkoutTemplate } from "@/zod-schemas/workout-template-schemas";

export const useListWorkoutTemplatesWithDetails = (args: {
  onSuccess: (data: ExtendedWorkoutTemplate[]) => void;
}) =>
  useMutation({
    mutationFn: getWorkoutTemplatesWithDetails,
    onSuccess: (data) => {
      args.onSuccess(data);
    },
  });
