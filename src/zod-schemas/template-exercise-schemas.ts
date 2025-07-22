import {
  Exercise,
  ExerciseMuscleGroup,
  MuscleGroup,
  TemplateExercise,
  TemplateExerciseSet,
} from "@prisma/client";
import { z } from "zod";
import { MuscleGroupWithDifficultySchema } from "@/zod-schemas/muscle-group-schemas";
import { SetSchema } from "@/zod-schemas/set-schema";

export type ExtendedTemplateExercise = TemplateExercise & {
  exercise: Exercise & {
    muscleGroupLinks: (ExerciseMuscleGroup & {
      muscleGroup: MuscleGroup;
    })[];
  };
  sets: TemplateExerciseSet[];
};

export type TemplateExerciseInput = {
  exerciseId: string;
  order: number;
  sets: TemplateExerciseSet[];
};

export const ExerciseForTemplateSchema = z.object({
  id: z.string().optional(),
  exerciseId: z.string(),
  order: z.number(),
  sets: z.array(SetSchema).min(1, "At least one set is required"),
});

export type ExerciseForTemplateInput = z.infer<
  typeof ExerciseForTemplateSchema
>;

export const ExerciseTemplateForDragDropSchema =
  ExerciseForTemplateSchema.extend({
    muscleGroupLinks: z.array(MuscleGroupWithDifficultySchema),
    name: z.string(),
    description: z.string().optional(),
    totalDifficulty: z.number().min(1).max(10),
  });

export type ExerciseTemplateForDragDrop = z.infer<
  typeof ExerciseTemplateForDragDropSchema
>;
