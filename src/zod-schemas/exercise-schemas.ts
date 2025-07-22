import { z } from "zod";
import { Exercise, ExerciseMuscleGroup, MuscleGroup } from "@prisma/client";
import { MuscleGroupWithDifficultySchema } from "./muscle-group-schemas";

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

export const ExerciseOptionSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string().optional(),
  totalDifficulty: z.number().min(1).max(10),
  muscleGroupLinks: z.array(MuscleGroupWithDifficultySchema),
});

export type ExerciseOption = z.infer<typeof ExerciseOptionSchema>;

export const WorkoutListElementExerciseSchema = z.object({
  id: z.string(),
  exercise: z.object({
    name: z.string(),
  }),
  sets: z.array(
    z.object({
      id: z.string(),
    }),
  ),
});

export type WorkoutListElementExercise = z.infer<
  typeof WorkoutListElementExerciseSchema
>;
