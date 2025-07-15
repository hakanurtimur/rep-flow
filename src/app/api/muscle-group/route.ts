// src/app/api/muscle-group/route.ts
import { getServerSession } from "next-auth";
import { getAllMuscleGroups } from "@/services/muscle-group-service";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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
