import api from "@/lib/axios-client";
import {
  CreateExerciseInput,
  ExtendedExercises,
  UpdateExerciseInput,
} from "@/zod-schemas/exercise-schemas";

// GET
export const getExercises = async (): Promise<ExtendedExercises[]> => {
  const res = await api.get<ExtendedExercises[]>("exercise");
  return res.data;
};

// POST
export const createExercise = async (
  args: CreateExerciseInput,
): Promise<CreateExerciseInput> => {
  const res = await api.post<CreateExerciseInput>("exercise", { ...args });

  return res.data;
};

// GET BY ID
export const getExerciseById = async (
  id: string,
): Promise<ExtendedExercises> => {
  const res = await api.get<ExtendedExercises>(`exercise/${id}`);
  return res.data;
};

//PUT
export const updateExercise = async (
  args: UpdateExerciseInput,
): Promise<UpdateExerciseInput> => {
  const res = await api.put<UpdateExerciseInput>(`exercise/${args.id}`, {
    ...args,
  });
  return res.data;
};

//DELETE
export const deleteExercise = async (id: string) => {
  return api.delete(`exercise/${id}`);
};
