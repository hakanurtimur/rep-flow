import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import {
  getWorkoutSessionWithWorkout,
  updateWorkoutSession,
} from "@/services/workout-session-service";
import { UpdateWorkoutSessionSchema } from "@/zod-schemas/workout-session-schemas";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const { id } = await params;

  if (!userId) {
    return Response.json(
      { success: false, data: null, message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const body = await getWorkoutSessionWithWorkout(id, userId);
    console.log(body);

    return Response.json(
      {
        success: true,
        data: body,
        message: "Workout fetched successfully",
      },
      { status: 200 },
    );
  } catch (err: any) {
    console.error("Unexpected error:", err);
    return Response.json(
      { success: false, data: null, message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
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
    const parsed = UpdateWorkoutSessionSchema.parse(body);

    const updated = await updateWorkoutSession(userId, parsed);

    return Response.json(
      { success: true, data: updated, message: "Workout session updated" },
      { status: 200 },
    );
  } catch (err: any) {
    console.error("Update session error:", err);
    return Response.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}
