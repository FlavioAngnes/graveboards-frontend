"use server";

import { Queue } from "@/types/queue";
import { cache } from "react";
import { verifySession } from "@/actions/session";
import { revalidatePath } from "next/cache";

const { API_URL } = process.env;

if (!API_URL) {
    throw new Error(
        "Please define the BACKEND_URL environment variable inside .env.local"
    );
}

export const getQueues = cache(async (params?: URLSearchParams) => {
    const session = await verifySession();

    if (!session) {
        return;
    }

    const url = new URL(`${API_URL}/queues`);

    if (params) {
        url.search = params.toString();
    }

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.token}`
        }
    });

    return await response.json() as Queue[];
});

export const getQueue = async (id: number) => {
    const session = await verifySession();

    if (!session) {
        return;
    }

    const response = await fetch(`${API_URL}/queues/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.token}`
        }
    });

    return await response.json() as Queue;
};

export const postQueue = async (queue: Partial<Queue>) => {
    const session = await verifySession();

    if (!session) {
        return;
    }

    const response = await fetch(`${API_URL}/queues`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.token}`
        },
        body: JSON.stringify(queue)
    });

    const q = await response.json() as Queue;

    revalidatePath("/queues");

    return q;
};

export const patchQueue = async (id: number, queue: {
    name?: string;
    description?: string;
    is_open?: boolean;
    visibility?: 0 | 1 | 2;
}) => {
    const session = await verifySession();

    if (!session) {
        return;
    }

    const response = await fetch(`${API_URL}/queues/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.token}`
        },
        body: JSON.stringify({
            name: queue.name,
            description: queue.description,
            is_open: queue.is_open,
            visibility: queue.visibility
        })
    });

    const q = await response.json() as Queue;

    revalidatePath("/queues");
    revalidatePath(`/queues/${id}`);

    return q;
};
