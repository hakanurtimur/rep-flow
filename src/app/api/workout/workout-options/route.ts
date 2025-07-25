import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-options";
import { getWorkoutOptions } from "@/services/workout-service";

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
    const data = await getWorkoutOptions(userId);
    return Response.json(
      {
        success: true,
        data,
        message: "Workouts fetched successfully",
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Error fetching workouts:", err);
    return Response.json(
      { success: false, data: null, message: "Internal server error" },
      { status: 500 },
    );
  }
}
