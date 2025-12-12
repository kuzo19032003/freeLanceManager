import { NextRequest, NextResponse } from "next/server";


export function proxy(req: NextRequest) {

    const token = req.cookies.get('token')?.value

    const protectedPaths = ["/", "/dashboard", "/profile", "/settings"]

    const isProtectedPath = protectedPaths.some(path => req.nextUrl.pathname.startsWith(path))

    if (!token && isProtectedPath) {
        const loginUrl = new URL("/login", req.nextUrl.origin)
        return NextResponse.redirect(loginUrl)
    }



  


    return NextResponse.rewrite(req.nextUrl)
}

export const config = {
    matcher: ["/"],
}