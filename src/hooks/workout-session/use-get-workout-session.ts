import { useQuery } from "@tanstack/react-query";
import {
  WorkoutSessionSession,
  WorkoutSessionWorkout,
} from "@/zod-schemas/workout-session-schemas";
import { getWorkoutSessionWithWorkout } from "@/api/workout-session-api";

export const useGetWorkoutSession = (id: string) => {
  return useQuery<{
    workout: WorkoutSessionWorkout;
    session: WorkoutSessionSession;
  }>({
    queryKey: ["workout-session", id],
    queryFn: async () => await getWorkoutSessionWithWorkout(id),
  });
};
