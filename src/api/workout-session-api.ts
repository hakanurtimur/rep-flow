import api from "@/lib/axios-client";
import {
  UpdateWorkoutSessionInput,
  WorkoutSessionElement,
  WorkoutSessionSession,
  WorkoutSessionWorkout,
} from "@/zod-schemas/workout-session-schemas";

// GET
export const getWorkoutSessionWithWorkout = async (
  id: string,
): Promise<{
  session: WorkoutSessionSession;
  workout: WorkoutSessionWorkout;
}> => {
  const res = await api.get<{
    session: WorkoutSessionSession;
    workout: WorkoutSessionWorkout;
  }>(`workout-session/${id}`);

  return res.data;
};

// POST
export const startWorkoutSession = async (input: {
  scheduledWorkoutId: string;
}): Promise<WorkoutSessionElement> => {
  const res = await api.post<
    typeof input,
    { success: boolean; data: WorkoutSessionElement }
  >("workout-session/start", input);

  return res.data;
};

// PATCH
export const updateWorkoutSession = async (
  input: UpdateWorkoutSessionInput,
): Promise<void> => {
  await api.patch(`workout-session/${input.id}`, input);
};
