import { NextRequest } from "next/server";
import { headers, cookies } from "next/headers";

// 41강
export async function GET(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    const headerList = headers()

    cookies().set("resultPerPage", "20");
    const theme = request.cookies.get("theme");

    console.log(headerList.get("Authorization"));
    console.log(requestHeaders.get("Authorization"));
    console.log(theme)
    console.log(cookies().get("resultsPerPage"))


    return new Response("<h1>Hello world!</h>", {  // render
      headers: {
        "Content-Type": "text/html",
        "Set-Cookie": "theme=dark"
      }
    });
}

// export const GET = async () => {
//     return new Response('api data');
//   };