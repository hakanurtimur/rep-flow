import { useQuery } from "@tanstack/react-query";
import { WorkoutListElement } from "@/zod-schemas/workout-schemas";
import { getWorkouts } from "@/api/workout-api";

export const useListWorkouts = () => {
  return useQuery<WorkoutListElement[]>({
    queryKey: ["workouts"],
    queryFn: async () => await getWorkouts(),
  });
};
