import { FoodInput, SearchedFood } from "@/zod-schemas/food-schemas";
import { prisma } from "@/lib/prisma";
import { searchFromUSDA } from "@/lib/usda-service";

// POST

export async function createFood(data: FoodInput) {
  return prisma.food.create({
    data: {
      name: data.name,
      calories: data.calories,
      protein: data.protein,
      carbs: data.carbs,
      fat: data.fat,
    },
  });
}

// GET by search query
export async function searchFoodService(
  query: string,
): Promise<SearchedFood[]> {
  const internalFoods = await prisma.food.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    take: 10,
  });

  const normalizedInternal = internalFoods.map((f) => ({
    id: f.id,
    name: f.name,
    source: "internal",
    calories: f.calories,
    protein: f.protein,
    fat: f.fat,
    carbs: f.carbs,
  })) satisfies SearchedFood[];

  if (normalizedInternal.length >= 5) {
    return normalizedInternal;
  }

  const externalFoods = await searchFromUSDA(query);

  const normalizedExternal: SearchedFood[] = externalFoods.map((f) => ({
    fdcId: f.fdcId,
    name: f.name,
    source: "external",
    calories: f.calories,
    protein: f.protein,
    fat: f.fat,
    carbs: f.carbs,
  }));

  return [
    ...normalizedInternal,
    ...normalizedExternal.slice(0, 10 - normalizedInternal.length),
  ];
}

// GET by id
export async function getFoodById(id: string) {
  return prisma.food.findUnique({
    where: { id },
  });
}
