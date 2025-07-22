import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { getWorkoutTemplatesWithDetails } from "@/services/workout-template-service";

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
  const idsParam = searchParams.get("ids");

  if (!idsParam) {
    return Response.json(
      { success: false, data: null, message: "Missing template ids" },
      { status: 400 },
    );
  }

  const templateIds = idsParam.split(",").map((id) => id.trim());

  try {
    const data = await getWorkoutTemplatesWithDetails(templateIds, userId);
    return Response.json(
      {
        success: true,
        data,
        message: "Workout template details fetched successfully",
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Error fetching workout template details:", err);
    return Response.json(
      { success: false, data: null, message: "Internal server error" },
      { status: 500 },
    );
  }
}
