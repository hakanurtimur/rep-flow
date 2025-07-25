import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteScheduledWorkout } from "@/api/scheduled-workout-api";

export const useDeleteScheduledWorkout = ({ onSuccess = () => {} }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteScheduledWorkout,
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
