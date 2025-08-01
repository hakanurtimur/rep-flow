import { useQuery } from "@tanstack/react-query";
import { searchFoods } from "@/api/food-api";

export function useSearchFoods(query: string, enabled = true) {
  return useQuery({
    queryKey: ["search-foods", query],
    queryFn: () => searchFoods(query),
    enabled: enabled && query.length > 0,
    staleTime: 1000 * 60 * 5,
  });
}
