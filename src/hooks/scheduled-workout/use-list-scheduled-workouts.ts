import { useQuery } from "@tanstack/react-query";
import { ScheduledWorkoutListElement } from "@/zod-schemas/scheduled-workout-schemas";
import { getScheduledWorkouts } from "@/api/scheduled-workout-api";

export const useListScheduledWorkouts = () => {
  return useQuery<ScheduledWorkoutListElement[]>({
    queryKey: ["scheduled-workouts"],
    queryFn: async () => await getScheduledWorkouts(),
  });
};
