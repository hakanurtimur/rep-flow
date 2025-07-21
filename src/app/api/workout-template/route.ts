import { getServerSession } from "next-auth/next";

import {
  createWorkoutTemplate,
  getWorkoutTemplates,
} from "@/services/workout-template-service";
import { authOptions } from "@/lib/auth-options";
import { Prisma } from "@prisma/client";

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
    const data = await getWorkoutTemplates(userId);
    return Response.json(
      {
        success: true,
        data,
        message: "Workout templates fetched successfully",
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Error fetching workout templates:", err);
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

    const newTE = await createWorkoutTemplate(userId, body);
    return Response.json(
      {
        success: true,
        data: newTE,
        message: "Workout template created successfully",
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
          message: "You already have a Workout template with this name.",
        },
        { status: 409 },
      );
    }
    console.error("Error creating Workout template:", err);
    return Response.json(
      { success: false, data: null, message: "Internal server error" },
      { status: 500 },
    );
  }
}
