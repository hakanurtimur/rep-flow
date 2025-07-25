import {
  CreateScheduledWorkoutInput,
  ScheduledWorkoutListElement,
  UpdateScheduledWorkoutInput,
  UpdateScheduledWorkoutStatusInput,
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

// PUT
export const updateScheduledWorkout = async (
  args: UpdateScheduledWorkoutInput,
): Promise<UpdateScheduledWorkoutInput> => {
  const res = await api.put<UpdateScheduledWorkoutInput>(
    `scheduled-workout/${args.id}`,
    { ...args },
  );
  return res.data;
};

// DELETE
export const deleteScheduledWorkout = async (id: string) => {
  return api.delete(`scheduled-workout/${id}`);
};

// PATCH as completed

export const updateScheduledWorkoutStatus = async (
  id: string,
  input: UpdateScheduledWorkoutStatusInput,
) => {
  return await api.patch(`scheduled-workout/${id}`, input);
};
