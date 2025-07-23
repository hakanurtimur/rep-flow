import { CreateScheduledWorkoutInput } from "@/zod-schemas/scheduled-workout-schemas";
import api from "@/lib/axios-client";

// POST
export const createScheduledWorkout = async (
  args: CreateScheduledWorkoutInput,
): Promise<CreateScheduledWorkoutInput> => {
  const res = await api.post<CreateScheduledWorkoutInput>(`scheduled-workout`, {
    ...args,
  });
  return res.data;
};
