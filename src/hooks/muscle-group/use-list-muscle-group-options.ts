import { useQuery } from "@tanstack/react-query";
import { getMuscleGroupOptions } from "@/api/muscle-group-api";
import { MuscleGroupOption } from "@/zod-schemas/exercise-schemas";

export const useListMuscleGroupOptions = () => {
  return useQuery<MuscleGroupOption[]>({
    queryKey: ["muscle-group-options"],
    queryFn: async () => await getMuscleGroupOptions(),
  });
};
