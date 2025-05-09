import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { encryptedData } = body;

  // ❗ FIX: await cookies() to access the cookie store
  const cookieStore = await cookies();

  cookieStore.set("sui_encrypted_wallet", JSON.stringify(encryptedData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 300,
    path: "/",
  });

  return NextResponse.json({ success: true });
}
