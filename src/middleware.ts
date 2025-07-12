import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/workouts");

  const isOnboardingRoute = pathname.startsWith("/onboarding");

  if (!token && (isProtectedRoute || isOnboardingRoute)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (token?.onboarded === false && !isOnboardingRoute) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  if (token?.onboarded === true && isOnboardingRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/workouts/:path*",
    "/onboarding/:path*",
  ],
};
