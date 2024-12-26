import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "auth";

const protectedRoutes = ["/dashboard", "/modules", "/profile"];

export default async function middleware(request: NextRequest) {
  const session = await auth();
  
  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (!session && isProtected) {
    const absoluteURL = new URL("/sign-in", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (session && request.nextUrl.pathname.startsWith('/sign-in')) {
    const absoluteURL = new URL("/dashboard", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
