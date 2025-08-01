import { NextResponse } from "next/server";
import { searchFoodService } from "@/services/food-service";
import { SearchFoodQuerySchema } from "@/zod-schemas/food-schemas";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    const parsed = SearchFoodQuerySchema.safeParse({ query });

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, data: null, message: "Invalid query parameter" },
        { status: 400 },
      );
    }

    const result = await searchFoodService(parsed.data.query);

    return Response.json(
      { success: true, data: result, message: "Foods fetched successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("[FOOD_SEARCH_ERROR]", error);
    return Response.json(
      { success: false, data: null, message: "Internal server error" },
      { status: 500 },
    );
  }
}
