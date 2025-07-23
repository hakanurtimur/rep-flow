import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import {
  deleteWorkout,
  getWorkoutById,
  updateWorkout,
} from "@/services/workout-service";

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
    const body = await getWorkoutById(userId, id);
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

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return Response.json(
      { success: false, data: null, message: "Unauthorized" },
      { status: 401 },
    );
  }

  const { id } = await params;

  try {
    const body = await req.json();

    if (!body) {
      return Response.json(
        { success: false, data: null, message: "Invalid fields" },
        { status: 400 },
      );
    }

    const updated = await updateWorkout(userId, id, body);

    return Response.json(
      {
        success: true,
        data: updated,
        message: "Workout updated",
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Error updating workout:", err);
    return Response.json(
      { success: false, data: null, message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
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
    const deleted = await deleteWorkout(id, userId);

    return Response.json(
      {
        success: true,
        data: deleted,
        message: "Workout template deleted successfully",
      },
      { status: 200 },
    );
  } catch (err: any) {
    if (err.code === "WORKOUT_SCHEDULED") {
      return Response.json(
        {
          success: false,
          data: null,
          message: err.message,
        },
        { status: 404 },
      );
    }
    console.error("Unexpected error:", err);
    return Response.json(
      { success: false, data: null, message: "Internal server error" },
      { status: 500 },
    );
  }
}
