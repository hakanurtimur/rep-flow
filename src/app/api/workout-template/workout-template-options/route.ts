import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { getWorkoutTemplateOptions } from "@/services/workout-template-service";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return Response.json(
      { success: false, data: null, message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const data = await getWorkoutTemplateOptions(userId);
    return Response.json(
      {
        success: true,
        data,
        message: "Workout templates fetched successfully",
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Error fetching Workout templates:", err);
    return Response.json(
      { success: false, data: null, message: "Internal server error" },
      { status: 500 },
    );
  }
}
