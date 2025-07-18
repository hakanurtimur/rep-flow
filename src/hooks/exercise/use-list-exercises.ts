import { useQuery } from "@tanstack/react-query";
import { getExercises } from "@/api/exercise-api";
import { ExtendedExercises } from "@/zod-schemas/exercise-schemas";

export const useListExercises = () => {
  return useQuery<ExtendedExercises[]>({
    queryKey: ["exercises"],
    queryFn: async () => await getExercises(),
  });
};
