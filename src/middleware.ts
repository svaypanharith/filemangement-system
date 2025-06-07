import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/welcome", "/signup", "/signin"];

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth_token")?.value;

  // if (token && publicRoutes.includes(pathname)) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }

  // // Protect dashboard routes
  // if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
  //   return NextResponse.redirect(new URL("/welcome", request.url));
  // }

  return NextResponse.next();
} 