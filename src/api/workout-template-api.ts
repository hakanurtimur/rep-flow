import api from "@/lib/axios-client";
import { WorkoutTemplateList } from "@/zod-schemas/workout-template-schemas";

export const getWorkoutTemplates = async (): Promise<WorkoutTemplateList[]> => {
  const res = await api.get<WorkoutTemplateList[]>("workout-template");
  return res.data;
};
