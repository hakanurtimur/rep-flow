import api from "@/lib/axios-client";
import type { MuscleGroup } from "@prisma/client";

export const getMuscleGroups = async (): Promise<MuscleGroup[]> => {
  const res = await api.get<MuscleGroup[]>("muscle-group");
  console.log(res);
  return res.data;
};
