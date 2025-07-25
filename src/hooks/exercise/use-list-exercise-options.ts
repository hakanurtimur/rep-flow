import { useQuery } from "@tanstack/react-query";
import { getExerciseOptions } from "@/api/exercise-api";
import { ExerciseOption } from "@/zod-schemas/exercise-schemas";

export const useListExerciseOptions = () => {
  return useQuery<ExerciseOption[]>({
    queryKey: ["exercises-options"],
    queryFn: async () => await getExerciseOptions(),
  });
};
