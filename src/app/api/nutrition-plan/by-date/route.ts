import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { getNutritionPlanByDate } from "@/services/nutrition-plan-service";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return Response.json(
      { success: false, data: null, message: "Unauthorized" },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(req.url);
  const dateParam = searchParams.get("date");

  if (!dateParam) {
    return Response.json(
      { success: false, data: null, message: "Missing date" },
      { status: 400 },
    );
  }

  const date = new Date(dateParam);
  if (isNaN(date.getTime())) {
    return Response.json(
      { success: false, data: null, message: "Invalid date" },
      { status: 400 },
    );
  }

  try {
    const plan = await getNutritionPlanByDate(userId, date);
    return Response.json({ success: true, data: plan }, { status: 200 });
  } catch (error) {
    console.error("Error fetching nutrition plan:", error);
    return Response.json(
      { success: false, data: null, message: "Internal server error" },
      { status: 500 },
    );
  }
}
