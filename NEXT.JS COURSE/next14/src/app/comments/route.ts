import { comments } from "./data";

export const GET = async () => {
    return Response.json(comments);
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