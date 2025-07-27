// lib/usda.ts
const API_KEY = process.env.NEXT_PUBLIC_USDA_API_KEY!;
const BASE_URL = "https://api.nal.usda.gov/fdc/v1";

export async function searchFoods(query: string) {
  const res = await fetch(
    `${BASE_URL}/foods/search?query=${query}&api_key=${API_KEY}`,
  );
  const data = await res.json();
  return data.foods;
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
