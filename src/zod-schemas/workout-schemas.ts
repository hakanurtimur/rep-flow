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

export type ExtendedWorkout = {
  id: string;
  name: string;
  description?: string | null;
  duration: number;
  difficulty: number;
  createdAt: string;
  updatedAt: string;
  exercises: {
    id: string;
    order: number;
    exercise: {
      id: string;
      name: string;
      description?: string | null;
      isSystem: boolean;
      totalDifficulty: number;
      muscleGroupLinks: {
        muscleGroup: {
          id: string;
          name: string;
          isSystem: boolean;
        };
      }[];
    };
    sets: {
      id: string;
      reps: number;
      weight: number;
      duration: number;
      restTime: number;
      order: number;
    }[];
  }[];
  templates: {
    template: {
      id: string;
      name: string;
      description?: string | null;
      duration: number;
      difficulty: number;
      isSystem: boolean;
      templateExercises: {
        id: string;
        order: number;
        exercise: {
          id: string;
          name: string;
          muscleGroupLinks: {
            muscleGroup: {
              id: string;
              name: string;
            };
          }[];
        };
        sets: {
          id: string;
          reps: number;
          weight: number;
          duration: number;
          restTime: number;
          order: number;
        }[];
      }[];
    };
  }[];
  scheduledWorkouts: {
    id: string;
    scheduledAt: string;
    completed: boolean;
  }[];
  CalendarEvent: {
    id: string;
    date: string;
    type: "WORKOUT" | "NUTRITION";
  }[];
  user: {
    id: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
  };
};

export const UpdateWorkoutSchema = CreateWorkoutSchema.extend({
  id: z.string().cuid("Workout ID is required"),
});

export type UpdateWorkoutInput = z.infer<typeof UpdateWorkoutSchema>;
