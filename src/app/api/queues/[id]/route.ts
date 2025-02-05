import { getQueue } from "@/actions/queues";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = Number((await params).id);

    return Response.json(await getQueue(id));
}
