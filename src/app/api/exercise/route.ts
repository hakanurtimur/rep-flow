import { getServerSession } from "next-auth";

import { Prisma } from "@prisma/client";
import { createExercise, getExercises } from "@/services/exercise-service";
import { authOptions } from "@/lib/auth-options";

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
    const data = await getExercises(userId);
    return Response.json(
      { success: true, data, message: "Exercises fetched successfully" },
      { status: 200 },
    );
  } catch (err) {
    console.error("Error fetching exercises:", err);
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

    const newExercise = await createExercise(body, userId);
    return Response.json(
      {
        success: true,
        data: newExercise,
        message: "Exercise created successfully",
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
          message: "You already have an exercise with this name.",
        },
        { status: 409 },
      );
    }
    console.error("Error creating exercise:", err);
    return Response.json(
      { success: false, data: null, message: "Internal server error" },
      { status: 500 },
    );
  }
}
