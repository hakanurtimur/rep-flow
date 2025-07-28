import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { createMealInPlan } from "@/services/meal-service";

import { Prisma } from "@prisma/client";
import { CreateMealInPlanSchema } from "@/zod-schemas/meal-schemas";

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
    const parsed = CreateMealInPlanSchema.parse(body);

    const data = await createMealInPlan(userId, parsed);

    return Response.json(
      { success: true, data, message: "Meal created in plan successfully" },
      { status: 201 },
    );
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return Response.json(
        { success: false, data: null, message: err.message },
        { status: 400 },
      );
    }

    return Response.json(
      { success: false, data: null, message: "Internal server error" },
      { status: 500 },
    );
  }
}
