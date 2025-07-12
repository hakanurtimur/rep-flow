import { NextRequest, NextResponse } from "next/server";
import { signUp } from "@/services/auth-service";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const user = await signUp(email, password);
    return NextResponse.json({ user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
