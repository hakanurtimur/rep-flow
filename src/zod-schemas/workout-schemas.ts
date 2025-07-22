import { z } from "zod";
import { WorkoutListElementTemplateSchema } from "@/zod-schemas/workout-template-schemas";
import { WorkoutListElementExerciseSchema } from "@/zod-schemas/exercise-schemas";

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
