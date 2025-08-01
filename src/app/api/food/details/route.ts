import { NextRequest, NextResponse } from "next/server";
import { getFoodDetailsFromUSDA } from "@/lib/usda-service";

export async function GET(req: NextRequest) {
  const fdcId = req.nextUrl.searchParams.get("fdcId");

  if (!fdcId || isNaN(Number(fdcId))) {
    return NextResponse.json(
      { success: false, message: "Invalid fdcId", data: null },
      { status: 400 },
    );
  }

  try {
    const foodDetails = await getFoodDetailsFromUSDA(Number(fdcId));

    return NextResponse.json({
      success: true,
      data: foodDetails,
      message: "Food details fetched successfully",
    });
  } catch (error) {
    console.error("USDA fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch food details", data: null },
      { status: 500 },
    );
  }
}
