// middleware.js  ← put this in your project ROOT (same level as package.json)
import { NextResponse } from "next/server";

// Pages that require the user to be logged IN
const PROTECTED = ["/account", "/orders", "/checkout"];

// Pages that require the user to be logged OUT (redirect to home if already logged in)
const AUTH_ONLY = ["/auth"];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("firebaseToken")?.value;

  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));
  const isAuthOnly = AUTH_ONLY.some((p) => pathname.startsWith(p));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (isAuthOnly && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/account/:path*",
    "/orders/:path*",
    "/checkout/:path*",
    "/auth/:path*",
  ],
};

