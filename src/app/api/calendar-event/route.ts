import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-options";
import { getCalendarEvents } from "@/services/calendar-event-service";

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
    const data = await getCalendarEvents(userId);
    return Response.json(
      {
        success: true,
        data,
        message: "Calendar fetched successfully",
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Error fetching calendar:", err);
    return Response.json(
      { success: false, data: null, message: "Internal server error" },
      { status: 500 },
    );
  }
}
