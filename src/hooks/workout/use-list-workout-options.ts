import { useQuery } from "@tanstack/react-query";
import { WorkoutOptionsItem } from "@/zod-schemas/workout-schemas";
import { getWorkoutOptions } from "@/api/workout-api";

export const useListWorkoutOptions = () => {
  return useQuery<WorkoutOptionsItem[]>({
    queryKey: ["workout-options"],
    queryFn: async () => await getWorkoutOptions(),
  });
};
