import { WorkoutListElement } from "@/zod-schemas/workout-schemas";
import api from "@/lib/axios-client";

// GET
export const getWorkouts = async (): Promise<WorkoutListElement[]> => {
  const res = await api.get<WorkoutListElement[]>("workout");
  return res.data;
};
