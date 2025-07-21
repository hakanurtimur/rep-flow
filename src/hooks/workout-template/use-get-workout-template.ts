import { useQuery } from "@tanstack/react-query";
import { getWorkoutTemplateById } from "@/api/workout-template-api";
import { ExtendedWorkoutTemplate } from "@/zod-schemas/workout-template-schemas";

export const useGetWorkoutTemplate = (id: string) => {
  return useQuery<ExtendedWorkoutTemplate>({
    queryKey: ["workout-template", id],
    queryFn: async () => await getWorkoutTemplateById(id),
  });
};
