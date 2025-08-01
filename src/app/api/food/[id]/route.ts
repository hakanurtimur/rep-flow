import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { getFoodById } from "@/services/food-service";

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
    const body = await getFoodById(id);

    return Response.json(
      {
        success: true,
        data: body,
        message: "Food fetched successfully",
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
