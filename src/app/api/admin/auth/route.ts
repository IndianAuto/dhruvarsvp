import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

export async function POST(request: NextRequest) {
  let password: string;
  try {
    ({ password } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json(
      { error: "Admin password not configured" },
      { status: 500 }
    );
  }

  // Timing-safe comparison
  const inputBuffer = Buffer.from(password || "");
  const expectedBuffer = Buffer.from(adminPassword);

  const isValid =
    inputBuffer.length === expectedBuffer.length &&
    timingSafeEqual(inputBuffer, expectedBuffer);

  if (!isValid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // Generate session token as HMAC of the password
  const sessionToken = createHmac("sha256", adminPassword)
    .update("admin_session")
    .digest("hex");

  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}
