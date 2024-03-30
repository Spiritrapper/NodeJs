import { comments } from "../data";

export const GET = async (
    _request: Request, 
    {params} : {params: {id: string}}
    )  => {
        const comment = comments.find( 
            (comment) => comment.id === parseInt(params.id)
        );
    return Response.json(comment);
}

export async function PATCH(
    request : Request, 
    {params} : {params: { id: string }}
    ) {
    const body = await request.json()
    const {text} = body  // js 객체에서 꺼내올때 {}사용, body 객체의 속성추출 (객체구조분해:destructuring)
    const index = comments.findIndex(
        comment => comment.id === parseInt(params.id)
    );
    comments[index].text = text;
    //return new Response("GET handler");
    return Response.json(comments[index])
}
