import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { startWorkoutSession } from "@/api/workout-session-api";
import type { WorkoutSessionElement } from "@/zod-schemas/workout-session-schemas";

interface UseStartWorkoutSessionOptions {
  onSuccess?: (data: WorkoutSessionElement) => void;
}

export const useStartWorkoutSession = (
  options: UseStartWorkoutSessionOptions = {},
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: startWorkoutSession,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["scheduled-workouts"] });
      options.onSuccess?.(data);
    },
    onError: (err) => {
      toast.error(
        err.message || "An error occurred while starting the workout.",
      );
    },
  });
};
