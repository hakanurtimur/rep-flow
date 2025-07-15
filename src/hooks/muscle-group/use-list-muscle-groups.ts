import { useQuery } from "@tanstack/react-query";
import type { MuscleGroup } from "@prisma/client";
import { getMuscleGroups } from "@/api/muscle-group-api";

export const useListMuscleGroups = () => {
  return useQuery<MuscleGroup[]>({
    queryKey: ["muscle-groups"],
    queryFn: async () => await getMuscleGroups(),
  });
};
