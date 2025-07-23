import { useQuery } from "@tanstack/react-query";
import { ExtendedWorkout } from "@/zod-schemas/workout-schemas";
import { getWorkoutById } from "@/api/workout-api";

export const useGetWorkout = (id: string) => {
  return useQuery<ExtendedWorkout>({
    queryKey: ["workout", id],
    queryFn: async () => await getWorkoutById(id),
  });
};
