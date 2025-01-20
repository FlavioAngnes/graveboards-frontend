"use server";

import {Queue} from "@/types/queue";
import {Pagination} from "@/actions/beatmapsets";
import { cache } from "react";
import { verifySession } from "@/actions/session";

const { API_URL } = process.env;

if (!API_URL) {
    throw new Error(
        "Please define the BACKEND_URL environment variable inside .env.local"
    );
}

export const getQueues = cache(async (page: number, options: Pagination) => {
    const session = await verifySession();

    if (!session) {
        return;
    }

    const searchParams = new URLSearchParams();

    searchParams.append('limit', (options.limit || 10).toString());
    searchParams.append('offset', ((options.offset || 0) + page * (options.limit || 10)).toString());

    const response = await fetch(`${API_URL}/queues?${searchParams}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.token}`,
        },
    });

    return await response.json() as Queue[];
})

export const getQueue = async (id: number) => {
    const session = await verifySession();

    if (!session) {
        return;
    }

    const response = await fetch(`${API_URL}/queues/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.token}`,
        },
    });

    return await response.json() as Queue;
}
