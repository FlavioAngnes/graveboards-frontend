import { verifySession } from "@/actions/session";

const { API_URL } = process.env;

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const id = Number((await params).id);

    const session = await verifySession();

    if (!session) {
        return new Response('Unauthorized', { status: 401 });
    }

    const response = await fetch(`${API_URL}/queues/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.token}`
        }
    });

    return new Response(JSON.stringify(await response.json()), { status: response.status });
}
