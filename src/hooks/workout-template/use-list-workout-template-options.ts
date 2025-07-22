import { useQuery } from "@tanstack/react-query";
import { WorkoutTemplateOption } from "@/zod-schemas/workout-template-schemas";
import { getWorkoutTemplateOptions } from "@/api/workout-template-api";

export const useListWorkoutTemplateOptions = () => {
  return useQuery<WorkoutTemplateOption[]>({
    queryKey: ["workout-template-options"],
    queryFn: async () => await getWorkoutTemplateOptions(),
  });
};
