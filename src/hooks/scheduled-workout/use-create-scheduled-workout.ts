import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createScheduledWorkout } from "@/api/scheduled-workout-api";

export const useCreateScheduledWorkout = ({ onSuccess = () => {} }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createScheduledWorkout,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["scheduled-workouts"] }),
        queryClient.invalidateQueries({ queryKey: ["calendar-events"] }),
      ]);
      onSuccess();
    },
    onError: (err) => {
      toast(err.message);
    },
  });
};
