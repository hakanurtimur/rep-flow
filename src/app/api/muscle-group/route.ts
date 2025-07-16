// src/app/api/muscle-group/route.ts
import { getServerSession } from "next-auth";
import {
  createMuscleGroup,
  getAllMuscleGroups,
} from "@/services/muscle-group-service";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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
    const data = await getAllMuscleGroups(userId);
    return Response.json(
      { success: true, data, message: "Muscle groups fetched successfully" },
      { status: 200 },
    );
  } catch (err) {
    console.error("Error fetching muscle groups:", err);
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

    const newMuscleGroup = await createMuscleGroup(userId, body.name);
    return Response.json(
      {
        success: true,
        data: newMuscleGroup,
        message: "Muscle group created successfully",
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
          message: "You already have a muscle group with this name.",
        },
        { status: 409 },
      );
    }
    console.error("Error creating muscle group:", err);
    return Response.json(
      { success: false, data: null, message: "Internal server error" },
      { status: 500 },
    );
  }
}
