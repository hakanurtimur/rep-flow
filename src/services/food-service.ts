import { prisma } from "@/lib/prisma";
import { FoodInput } from "@/zod-schemas/food-schemas";

// POST
export async function createFood(data: FoodInput) {
  const existing = await prisma.food.findUnique({
    where: { name: data.name },
  });

  if (existing) return existing;

  return prisma.food.create({ data });
}
