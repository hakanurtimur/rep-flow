import { NextResponse } from "next/server";
import { completeOnboarding } from "@/services/onboarding-service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  try {
    const user = await completeOnboarding(session.user.id, body);
    return NextResponse.json(user);
  } catch (err) {
    console.error("Onboarding error:", err);
    return NextResponse.json(
      { error: "Failed to complete onboarding" },
      { status: 500 },
    );
  }
}
