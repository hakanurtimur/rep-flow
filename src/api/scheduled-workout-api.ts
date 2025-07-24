import {
  CreateScheduledWorkoutInput,
  ScheduledWorkoutListElement,
} from "@/zod-schemas/scheduled-workout-schemas";
import api from "@/lib/axios-client";

// GET
export const getScheduledWorkouts = async (): Promise<
  ScheduledWorkoutListElement[]
> => {
  const res = await api.get<ScheduledWorkoutListElement[]>("scheduled-workout");
  return res.data;
};

// POST
export const createScheduledWorkout = async (
  args: CreateScheduledWorkoutInput,
): Promise<CreateScheduledWorkoutInput> => {
  const res = await api.post<CreateScheduledWorkoutInput>(`scheduled-workout`, {
    ...args,
  });
  return res.data;
};
