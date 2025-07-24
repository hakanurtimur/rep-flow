import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-options";
import { Prisma } from "@prisma/client";
import {
  createScheduledWorkout,
  getScheduledWorkouts,
} from "@/services/scheduled-workout-service";

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
    const data = await getScheduledWorkouts(userId);
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

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return Response.json(
      { success: false, data: null, message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const body = await req.json();

    const newW = await createScheduledWorkout(userId, body);
    return Response.json(
      {
        success: true,
        data: newW,
        message: "Workout scheduled successfully",
      },
      { status: 201 },
    );
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return Response.json(
        {
          success: false,
          data: null,
          message: "You already have a Scheduled Workout with this name.",
        },
        { status: 409 },
      );
    }
    console.error("Error scheduling Workout:", err);
    return Response.json(
      { success: false, data: null, message: "Internal server error" },
      { status: 500 },
    );
  }
}
