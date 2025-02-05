import { NextRequest } from "next/server";
import { getRequests } from "@/actions/requests";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams

    return Response.json(await getRequests(searchParams));
}
