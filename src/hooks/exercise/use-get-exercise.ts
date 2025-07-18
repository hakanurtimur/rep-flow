import { useQuery } from "@tanstack/react-query";
import { getExerciseById } from "@/api/exercise-api";
import { ExtendedExercises } from "@/zod-schemas/exercise-schemas";

export const useGetExercise = (id: string, enabled: boolean) => {
  return useQuery<ExtendedExercises>({
    queryKey: ["exercise", id],
    queryFn: async () => await getExerciseById(id),
    enabled: enabled,
  });
};
