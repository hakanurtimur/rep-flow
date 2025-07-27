import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { startWorkoutSession } from "@/services/workout-session-service";
import { authOptions } from "@/lib/auth-options";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const body = await req.json();
    const { scheduledWorkoutId } = body;

    if (!scheduledWorkoutId) {
      return Response.json(
        { success: false, message: "Missing scheduledWorkoutId" },
        { status: 400 },
      );
    }

    const sessionData = await startWorkoutSession(userId, scheduledWorkoutId);

    return Response.json({ success: true, data: sessionData });
  } catch (err) {
    console.error("Failed to start workout session:", err);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
