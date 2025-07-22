import { WorkoutTemplate } from "@prisma/client";

import { z } from "zod";
import {
  ExerciseForTemplateSchema,
  ExtendedTemplateExercise,
} from "@/zod-schemas/template-exercise-schemas";

export const WorkoutTemplateListSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  difficulty: z.number(),
  duration: z.number(),
  isSystem: z.boolean(),
  templateExercises: z.array(
    z.object({
      id: z.string(),
      exercise: z.object({
        name: z.string(),
      }),
      sets: z.array(
        z.object({
          id: z.string(),
        }),
      ),
    }),
  ),
});

export type WorkoutTemplateList = z.infer<typeof WorkoutTemplateListSchema>;

export type ExtendedWorkoutTemplate = WorkoutTemplate & {
  templateExercises: ExtendedTemplateExercise[];
};

export const UpdateWorkoutTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  duration: z.number().nonnegative(),
  difficulty: z.number().nonnegative(),
  templateExercises: z.array(ExerciseForTemplateSchema),
});

export type UpdateWorkoutTemplateInput = z.infer<
  typeof UpdateWorkoutTemplateSchema
>;

export const CreateWorkoutTemplateSchema = UpdateWorkoutTemplateSchema.omit({
  id: true,
});

export type CreateWorkoutTemplateInput = z.infer<
  typeof CreateWorkoutTemplateSchema
>;

export const WorkoutListElementTemplateSchema = z.object({
  template: z.object({
    id: z.string(),
    name: z.string(),
    isSystem: z.boolean(),
  }),
});

export type WorkoutListElementTemplate = z.infer<
  typeof WorkoutListElementTemplateSchema
>;
