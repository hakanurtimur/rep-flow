import { z } from "zod";

export const WorkoutSessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  workoutId: z.string(),
  scheduledWorkoutId: z.string().nullable().optional(),
  currentStep: z.number(),
  durationElapsed: z.number(),
  isPaused: z.boolean(),
  isActive: z.boolean(),
  startedAt: z.string().datetime(),
  endedAt: z.string().datetime().nullable().optional(),
});

export type WorkoutSessionElement = z.infer<typeof WorkoutSessionSchema>;

export interface WorkoutSessionSession {
  id: string;
  userId: string;
  workoutId: string;
  scheduledWorkoutId?: string | null;
  currentStep: number;
  durationElapsed: number;
  isPaused: boolean;
  isActive: boolean;
  startedAt: string;
  endedAt?: string | null;
}

export interface WorkoutSessionWorkout {
  id: string;
  name: string;
  description?: string;
  duration: number;
  difficulty: number;
  exercises: WorkoutSessionWorkoutExercise[];
}

export interface WorkoutSessionWorkoutExercise {
  id: string;
  order: number;
  exercise: {
    name: string;
    description?: string;
  };
  sets: WorkoutSessionWorkoutExerciseSet[];
}

export interface WorkoutSessionWorkoutExerciseSet {
  reps: number;
  weight?: number;
  restTime?: number;
  duration?: number;
  order: number;
}

export interface CurrentExerciseData {
  exercise: WorkoutSessionWorkoutExercise;
  set: WorkoutSessionWorkoutExerciseSet;
  setIndex: number;
  exerciseIndex: number;
}

export interface WorkoutSessionState {
  session: WorkoutSessionSession;
  currentExerciseData: CurrentExerciseData | null;
  totalSteps: number;
  currentTimer: number;
  isSetActive: boolean;
  isResting: boolean;
  restTimeRemaining: number;
}

export const UpdateWorkoutSessionSchema = z.object({
  id: z.string(),
  currentStep: z.number().optional(),
  durationElapsed: z.number().optional(),
  isPaused: z.boolean().optional(),
  isActive: z.boolean().optional(),
  endedAt: z.string().datetime().optional(),
});

export type UpdateWorkoutSessionInput = z.infer<
  typeof UpdateWorkoutSessionSchema
>;
