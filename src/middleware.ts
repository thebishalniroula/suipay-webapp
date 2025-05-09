// middleware.ts
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { axiosInstance } from "./client/axios";

// Authentication check
async function isAuthenticated(req: NextRequest): Promise<boolean> {
  // Replace this with your real authentication logic
  const accessToken = req.cookies.get("accessToken")?.value;
  try {
    const res = await axiosInstance.get("/merchant/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// Public routes
const PUBLIC_PATHS = ["/", "/signup", "/signin"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // Check authentication for protected routes
  if (!(await isAuthenticated(req))) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/signin";
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signup", "/signin", "/((?!api|_next|favicon.ico).*)"],
};
