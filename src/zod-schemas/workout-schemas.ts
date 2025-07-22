import { z } from "zod";
import { WorkoutListElementTemplateSchema } from "@/zod-schemas/workout-template-schemas";
import { WorkoutListElementExerciseSchema } from "@/zod-schemas/exercise-schemas";
import { SetSchema } from "@/zod-schemas/set-schema";

export const WorkoutListElementSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  difficulty: z.number(),
  duration: z.number(),
  createdAt: z.string(),
  templates: z.array(WorkoutListElementTemplateSchema),
  exercises: z.array(WorkoutListElementExerciseSchema),
});

export type WorkoutListElement = z.infer<typeof WorkoutListElementSchema>;

export const CreateWorkoutSchema = z.object({
  name: z.string().min(1, "Workout name is required"),
  description: z.string().optional(),
  difficulty: z.number().int().min(1).max(10),
  duration: z.number().int().min(1),
  templateIds: z.array(z.string().cuid()),
  exercises: z
    .array(
      z.object({
        exerciseId: z.string().cuid(),
        order: z.number().int().nonnegative(),
        sets: z.array(SetSchema).min(1, "At least one set is required"),
      }),
    )
    .min(1, "At least one exercise is required"),
});

export type CreateWorkoutInput = z.infer<typeof CreateWorkoutSchema>;
