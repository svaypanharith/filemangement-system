import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // const storedToken = request.cookies.get("auth_token")?.value;
  // const { pathname } = request.nextUrl;

  // const publicPaths = ["/", "/login", "/signup", "/forgot-password", "/signin"];
  // const isPublicPath = publicPaths.includes(pathname);
  // const isDashboardPath = pathname.startsWith("/dashboard");


  // if (isDashboardPath && !storedToken) {
  //   return NextResponse.redirect(new URL("/signin", request.url));
  // }


  // if (isPublicPath && storedToken) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }


  // if (!isPublicPath && !storedToken) {
  //   return NextResponse.redirect(new URL("/signin", request.url));
  // }

  // return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}; 