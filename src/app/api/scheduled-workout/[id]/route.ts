import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import {
  deleteScheduledWorkout,
  updateScheduledWorkout,
  updateScheduledWorkoutStatus,
} from "@/services/scheduled-workout-service";
import { UpdateScheduledWorkoutStatusSchema } from "@/zod-schemas/scheduled-workout-schemas";

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

    const updated = await updateScheduledWorkout(userId, id, body);

    return Response.json(
      {
        success: true,
        data: updated,
        message: "Scheduled Workout updated",
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Error updating scheduled workout:", err);
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
    const deleted = await deleteScheduledWorkout(id);

    return Response.json(
      {
        success: true,
        data: deleted,
        message: "Scheduled Workout deleted successfully",
      },
      { status: 200 },
    );
  } catch (err: any) {
    if (err.code === "NOT_FOUND") {
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

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  const { id } = await params;
  const body = await req.json();

  const parsed = UpdateScheduledWorkoutStatusSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { success: false, message: "Invalid data" },
      { status: 400 },
    );
  }

  try {
    const updated = await updateScheduledWorkoutStatus(userId, id, parsed.data);
    return Response.json(
      {
        success: true,
        data: updated,
        message: "Scheduled workout status updated",
      },
      { status: 200 },
    );
  } catch (err: any) {
    if (err.code === "NOT_FOUND") {
      return Response.json(
        { success: false, message: err.message },
        { status: 404 },
      );
    }

    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
