import {
  Exercise,
  ExerciseMuscleGroup,
  MuscleGroup,
  TemplateExercise,
  TemplateExerciseSet,
  WorkoutTemplate,
} from "@prisma/client";

import { z } from "zod";

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
  templateExercises: (TemplateExercise & {
    exercise: Exercise & {
      muscleGroupLinks: (ExerciseMuscleGroup & {
        muscleGroup: MuscleGroup;
      })[];
    };
    sets: TemplateExerciseSet[];
  })[];
};
