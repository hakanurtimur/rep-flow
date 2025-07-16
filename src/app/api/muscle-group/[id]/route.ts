import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  deleteMuscleGroup,
  updateMuscleGroup,
} from "@/services/muscle-group-service";
import { Prisma } from "@prisma/client";

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
    const { name } = await req.json();

    if (!name || typeof name !== "string") {
      return Response.json(
        { success: false, data: null, message: "Invalid name" },
        { status: 400 },
      );
    }

    const updated = await updateMuscleGroup(id, userId, name);

    return Response.json(
      {
        success: true,
        data: updated,
        message: "Muscle group updated",
      },
      { status: 200 },
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
    console.error("Error updating muscle group:", err);
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

  console.log(id);

  try {
    const deleted = await deleteMuscleGroup(id, userId);

    return Response.json(
      {
        success: true,
        data: deleted,
        message: "Muscle group deleted successfully",
      },
      { status: 200 },
    );
  } catch (err: any) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return Response.json(
        {
          success: false,
          data: null,
          message: "Muscle group not found or already deleted.",
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
