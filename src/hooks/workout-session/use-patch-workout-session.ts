import { UpdateWorkoutSessionInput } from "@/zod-schemas/workout-session-schemas";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateWorkoutSession } from "@/api/workout-session-api";

export const usePatchWorkoutSession = ({
  onSuccess = () => {},
}: {
  onSuccess?: () => void;
} = {}) => {
  return useMutation({
    mutationFn: (data: UpdateWorkoutSessionInput) => updateWorkoutSession(data),
    onSuccess: () => {
      onSuccess();
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update workout session");
    },
  });
};
