import {
  CreateWorkoutInput,
  ExtendedWorkout,
  UpdateWorkoutInput,
  WorkoutListElement,
} from "@/zod-schemas/workout-schemas";
import api from "@/lib/axios-client";

// GET
export const getWorkouts = async (): Promise<WorkoutListElement[]> => {
  const res = await api.get<WorkoutListElement[]>("workout");
  return res.data;
};

// POST
export const createWorkout = async (
  args: CreateWorkoutInput,
): Promise<CreateWorkoutInput> => {
  const res = await api.post<CreateWorkoutInput>(`workout`, {
    ...args,
  });
  return res.data;
};

// GET BY ID
export const getWorkoutById = async (id: string): Promise<ExtendedWorkout> => {
  const res = await api.get<ExtendedWorkout>(`workout/${id}`);
  return res.data;
};

// PUT
export const updateWorkout = async (
  args: UpdateWorkoutInput,
): Promise<UpdateWorkoutInput> => {
  const res = await api.put<UpdateWorkoutInput>(`workout/${args.id}`, {
    ...args,
  });
  return res.data;
};

// DELETE
export const deleteWorkout = async (id: string) => {
  return api.delete(`workout/${id}`);
};
