import { useQuery } from "@tanstack/react-query";
import { getNutritionPlanByDate } from "@/api/nutiriton-plan-api";

export const useGetNutritionPlanByDate = (date: string) => {
  return useQuery({
    queryKey: ["nutrition-plans", date],
    queryFn: () => getNutritionPlanByDate(date),
    enabled: !!date,
  });
};
