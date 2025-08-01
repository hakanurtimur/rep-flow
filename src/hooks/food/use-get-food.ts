import { useQuery } from "@tanstack/react-query";
import { Food } from "@prisma/client";
import { getFoodById } from "@/api/food-api";

export const useGetFood = (id: string) => {
  return useQuery<Food>({
    queryKey: ["food", id],
    queryFn: async () => await getFoodById(id),
  });
};
