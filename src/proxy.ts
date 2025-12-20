import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/register"]

export function proxy(req: NextRequest) {

    const pathname = req.nextUrl.pathname
    const token = req.cookies.get('refresh_Token')?.value

    const protectedPaths = "/dashboard"



    if (!token && pathname.startsWith(protectedPaths)) {
        const loginUrl = new URL("/login", req.url)
        return NextResponse.redirect(loginUrl)
    }
    
    if (
        token &&
        PUBLIC_PATHS.includes(pathname)
    ) {
        const homeUrl = new URL("/dashboard", req.url)
        return NextResponse.redirect(homeUrl)
    }


    if (pathname === "/") {
        if (token) {
            return NextResponse.redirect(new URL('/dashboard', req.url))
        } else {
            return NextResponse.redirect(new URL('/login', req.url))
        }
    }


    return NextResponse.next()
}

