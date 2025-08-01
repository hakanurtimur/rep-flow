// lib/usda.ts
import { SearchedFood } from "@/zod-schemas/food-schemas";

const API_KEY = process.env.USDA_API_KEY!;
const BASE_URL = "https://api.nal.usda.gov/fdc/v1";

export async function searchFromUSDA(query: string): Promise<SearchedFood[]> {
  const res = await fetch(
    `${BASE_URL}/foods/search?query=${query}&api_key=${API_KEY}`,
  );

  const data = await res.json();

  return (data.foods || []).map((food: any) => ({
    fdcId: food.fdcId,
    name: food.description,
    source: "external",
  }));
}

export async function getFoodDetails(fdcId: number) {
  const res = await fetch(`${BASE_URL}/food/${fdcId}?api_key=${API_KEY}`);
  const data = await res.json();

  const get = (name: string) =>
    data.foodNutrients.find((n: any) =>
      n.nutrientName.toLowerCase().includes(name.toLowerCase()),
    )?.value ?? 0;

  return {
    name: data.description,
    calories: get("energy"),
    protein: get("protein"),
    carbs: get("carbohydrate"),
    fat: get("fat"),
  };
}

export async function getFoodDetailsFromUSDA(fdcId: number) {
  const res = await fetch(
    `https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=${API_KEY}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch food details from USDA");
  }

  const data = await res.json();

  const nutrients = data.labelNutrients ?? [];

  return {
    name: data.description,
    calories: nutrients.calories.value,
    protein: nutrients.protein.value,
    fat: nutrients.fat.value,
    carbs: nutrients.carbohydrates.value,
  };
}
