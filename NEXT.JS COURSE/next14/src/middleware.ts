import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const response = NextResponse.next()

    const themePreference = request.cookies.get("theme")
    if(!themePreference) {
        response.cookies.set("theme", "dark");
    }

    response.headers.set("custom-header", "custom-value")


    return response;
    // if( request.nextUrl.pathname === "/profile"){
    //     return NextResponse.redirect(new URL("/hello",request.url))
    // }
    // 1. return NextResponse.redirect(new URL("/", request.url))
}

// 1. 리다이렉트 방법
// export const config= {
//     matcher:"/profile",
// }