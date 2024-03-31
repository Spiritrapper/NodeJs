import { NextRequest } from "next/server";
import { comments } from "./data";
import { comment } from "postcss";

export const GET = async (request: NextRequest) => {
    const searchParams =request.nextUrl.searchParams
    const query = searchParams.get("query")
    const filterComments = query ?
        comments.filter(comment => comment.text.includes(query)) :
        comments
    return Response.json(filterComments);
}


export const POST = async (request: Request) => {
    const comment =await request.json()
    const newcomment = {
        id: comments.length + 1,
        text: comment.text
    }
    comments.push(newcomment)
    return new Response(JSON.stringify(newcomment),{
        headers: {
            "Content-Type": "application/json",
        },
        status: 201,
    });
}