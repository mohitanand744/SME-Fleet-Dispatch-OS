import { NextRequest, NextResponse } from "next/server";
import { getSubdomain, getRoleFromSubdomain } from "@/lib/subdomain";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";

  // Skip static assets, API calls, and Next.js internal files
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname.includes(".") ||
    url.pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  const subdomain = getSubdomain(hostname);
  const role = getRoleFromSubdomain(subdomain);

  // If subdomain is mapped to a role (e.g. admin.localhost or dispatcher.localhost)
  if (role) {
    // Avoid rewriting auth pages
    if (url.pathname === "/login") {
      return NextResponse.next();
    }

    // Rewrite root / to role portal
    if (url.pathname === "/" || url.pathname === "/dashboard") {
      url.pathname = `/${role}`;
      return NextResponse.rewrite(url);
    }

    // If pathname doesn't already start with the role, prefix it
    if (!url.pathname.startsWith(`/${role}`)) {
      url.pathname = `/${role}${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
