import { getBeatmapsets } from "@/actions/beatmapsets";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    return Response.json(await getBeatmapsets(searchParams));
}
