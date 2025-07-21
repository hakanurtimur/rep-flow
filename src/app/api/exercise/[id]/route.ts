import { getServerSession } from "next-auth";

import {
  deleteExercise,
  getExerciseById,
  updateExercise,
} from "@/services/exercise-service";
import { Prisma } from "@prisma/client";
import { authOptions } from "@/lib/auth-options";

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
    const deleted = await getExerciseById(id, userId);

    return Response.json(
      {
        success: true,
        data: deleted,
        message: "Exercise fetched successfully",
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

    const updated = await updateExercise(id, userId, body);

    return Response.json(
      {
        success: true,
        data: updated,
        message: "Excercise group updated",
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
          message: "You already have a exercise with this name.",
        },
        { status: 409 },
      );
    }
    console.error("Error updating exercise:", err);
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
    const deleted = await deleteExercise(id, userId);

    return Response.json(
      {
        success: true,
        data: deleted,
        message: "Exercise deleted successfully",
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
          message: "Exercise not found or already deleted.",
        },
        { status: 404 },
      );
    }

    if (err.code === "EXERCISE_IN_USE") {
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
