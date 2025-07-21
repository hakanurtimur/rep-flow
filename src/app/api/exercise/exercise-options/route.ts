import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { getExerciseOptions } from "@/services/exercise-service";

export async function GET() {
  console.log("%%OEOQWEOWQOEOQWEQWOEOWWQOEOQWEOWQ");
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return Response.json(
      { success: false, data: null, message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const data = await getExerciseOptions(userId);
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
