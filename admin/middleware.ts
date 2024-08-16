import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ["/((?!_next|api/auth).*)(.+)", "/"],
};

const authPages = ["/login"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("authorization");
    console.log('Token:', token);
    if (!authPages.includes(pathname)) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    if (authPages.includes(pathname)) {
        if (token) {
            return NextResponse.redirect(new URL("/report", request.url));
        }
    }

    return NextResponse.next();
}
