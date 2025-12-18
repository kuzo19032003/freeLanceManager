import { NextRequest, NextResponse } from "next/server";


export function proxy(req: NextRequest) {
    const pathname = req.nextUrl.pathname
    const token = req.cookies.get('refresh_Token')?.value

    const protectedPaths = "/dashboard"

    if (pathname === "/") {
        if (token) {
            return NextResponse.rewrite(new URL('/dashboard', req.url))
        } else {
            return NextResponse.redirect(new URL('/login', req.url))
        }
    }

    if (!token && pathname.startsWith(protectedPaths)) {
        const loginUrl = new URL("/login", req.url)
        return NextResponse.redirect(loginUrl)
    }





    return NextResponse.next()
}

