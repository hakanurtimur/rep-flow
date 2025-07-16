import api from "@/lib/axios-client";
import type { MuscleGroup } from "@prisma/client";
import { CreateUpdateMuscleGroup } from "@/zod-schemas/muscle-group-schemas";

// GET
export const getMuscleGroups = async (): Promise<MuscleGroup[]> => {
  const res = await api.get<MuscleGroup[]>("muscle-group");
  return res.data;
};

// POST
export const createMuscleGroup = async (
  name: string,
): Promise<CreateUpdateMuscleGroup> => {
  const res = await api.post<CreateUpdateMuscleGroup>("muscle-group", { name });

  return res.data;
};

// PUT
export const updateMuscleGroup = async (
  args: CreateUpdateMuscleGroup,
): Promise<CreateUpdateMuscleGroup> => {
  const { id, name } = args;
  const res = await api.put<CreateUpdateMuscleGroup>(`muscle-group/${id}`, {
    name,
  });
  return res.data;
};

// DELETE
export const deleteMuscleGroup = async (id: string) => {
  return api.delete(`muscle-group/${id}`);
};
