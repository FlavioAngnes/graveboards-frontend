import { NextRequest } from "next/server";
import { getQueues } from "@/actions/queues";

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;

    return Response.json(await getQueues(params));
}
