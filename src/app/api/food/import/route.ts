import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { Prisma } from "@prisma/client";
import { FoodSchema } from "@/zod-schemas/food-schemas";
import { createFood } from "@/services/food-service";

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
    const parsed = FoodSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        {
          success: false,
          data: null,
          message: "Validation failed",
          errors: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const food = await createFood(parsed.data);

    return Response.json(
      { success: true, data: food, message: "Food created successfully" },
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
          message: "Food with this name already exists.",
        },
        { status: 409 },
      );
    }

    console.error("Error creating food:", err);
    return Response.json(
      { success: false, data: null, message: "Internal server error" },
      { status: 500 },
    );
  }
}
