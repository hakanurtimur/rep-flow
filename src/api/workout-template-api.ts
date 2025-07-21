import api from "@/lib/axios-client";
import {
  CreateWorkoutTemplateInput,
  ExtendedWorkoutTemplate,
  UpdateWorkoutTemplateInput,
  WorkoutTemplateList,
} from "@/zod-schemas/workout-template-schemas";

// GET
export const getWorkoutTemplates = async (): Promise<WorkoutTemplateList[]> => {
  const res = await api.get<WorkoutTemplateList[]>("workout-template");
  return res.data;
};

// GET BY ID
export const getWorkoutTemplateById = async (
  id: string,
): Promise<ExtendedWorkoutTemplate> => {
  const res = await api.get<ExtendedWorkoutTemplate>(`workout-template/${id}`);
  return res.data;
};

// PUT
export const updateWorkoutTemplate = async (
  args: UpdateWorkoutTemplateInput,
): Promise<UpdateWorkoutTemplateInput> => {
  const res = await api.put<UpdateWorkoutTemplateInput>(
    `workout-template/${args.id}`,
    { ...args },
  );
  return res.data;
};

// POST
export const createWorkoutTemplate = async (
  args: CreateWorkoutTemplateInput,
): Promise<CreateWorkoutTemplateInput> => {
  const res = await api.post<CreateWorkoutTemplateInput>(`workout-template`, {
    ...args,
  });
  return res.data;
};

// DELETE
export const deleteWorkoutTemplate = async (id: string) => {
  return api.delete(`workout-template/${id}`);
};
