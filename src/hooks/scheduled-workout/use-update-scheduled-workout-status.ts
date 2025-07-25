import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateScheduledWorkoutStatus } from "@/api/scheduled-workout-api";
import { UpdateScheduledWorkoutStatusInput } from "@/zod-schemas/scheduled-workout-schemas";

export const useUpdateScheduledWorkoutStatus = ({
  onSuccess = () => {},
}: {
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: {
      id: string;
      input: UpdateScheduledWorkoutStatusInput;
    }) => {
      return updateScheduledWorkoutStatus(id, input);
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["scheduled-workouts"] }),
        queryClient.invalidateQueries({ queryKey: ["calendar-events"] }),
      ]);
      onSuccess();
    },
    onError: (err: any) => {
      toast.error(err.message ?? "Failed to update status");
    },
  });
};
