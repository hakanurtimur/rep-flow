import { useQuery } from "@tanstack/react-query";
import { getWorkoutTemplates } from "@/api/workout-template-api";
import { WorkoutTemplateList } from "@/zod-schemas/workout-template-schemas";

export const useListWorkoutTemplates = () => {
  return useQuery<WorkoutTemplateList[]>({
    queryKey: ["workout-templates"],
    queryFn: async () => await getWorkoutTemplates(),
  });
};
