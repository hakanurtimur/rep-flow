import { z } from "zod";
import { Exercise, ExerciseMuscleGroup, MuscleGroup } from "@prisma/client";

export type ExtendedExercises = Exercise & {
  muscleGroupLinks: (ExerciseMuscleGroup & {
    muscleGroup: MuscleGroup;
  })[];
};

export const CreateExerciseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  totalDifficulty: z.number().min(1).max(10),
  muscleGroups: z
    .array(
      z.object({
        muscleGroupId: z.string().min(1, "Muscle group ID is required"),
        difficulty: z.number().min(1).max(10),
      }),
    )
    .min(1, "At least one muscle group is required"),
});

export type CreateExerciseInput = z.infer<typeof CreateExerciseSchema>;

export const UpdateExerciseSchema = CreateExerciseSchema.extend({
  id: z.string(),
});

export type UpdateExerciseInput = z.infer<typeof UpdateExerciseSchema>;

export const MuscleGroupOptionsSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type MuscleGroupOption = z.infer<typeof MuscleGroupOptionsSchema>;
