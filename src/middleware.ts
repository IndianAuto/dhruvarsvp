import { NextRequest, NextResponse } from "next/server";

async function computeToken(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode("admin_session"));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin paths, not /admin/login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const sessionCookie = request.cookies.get("admin_session")?.value;

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const password = process.env.ADMIN_PASSWORD;
    if (!password) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const expectedToken = await computeToken(password);

    if (sessionCookie !== expectedToken) {
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.set("admin_session", "", { path: "/admin", maxAge: 0 });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
