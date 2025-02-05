"use server";

import { verifySession } from "@/actions/session";
import { BeatmapsetRequest } from "@/types/requests/request";

const { API_URL } = process.env;

if (!API_URL) {
    throw new Error(
        "Please define the BACKEND_URL environment variable inside .env.local"
    );
}

interface PostRequest {
    beatmapset_id: number;
    comment: string;
    mv_checked: boolean;
    user_id: number;
    queue_id: number;
}

export const getRequests = async (params: URLSearchParams) => {
    const session = await verifySession();

    if (!session) {
        return [];
    }

    const response = await fetch(`${API_URL}/requests/listings?${params}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch requests.");
    }

    return await response.json() as BeatmapsetRequest[];
};


export const postRequest = async (request: PostRequest) => {
    const session = await verifySession();

    if (!session) {
        return;
    }

    const response = await fetch(`${API_URL}/requests`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        },
        body: JSON.stringify(request)
    });

    if (!response.ok) {
        return null;
    }

    return await response.json();
};

export const patchRequest = async (id: number, request: Partial<BeatmapsetRequest>) => {
    const session = await verifySession();

    if (!session) {
        return;
    }

    const response = await fetch(`${API_URL}/requests/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        },
        body: JSON.stringify(request)
    });

    if (!response.ok) {
        return null;
    }

    return await response.json();
};

/*export const deleteRequest = async (id: number, init?: RequestInit) => {
    const session = await verifySession();

    if (!session) {
        return;
    }

    return await fetch(`${API_URL}/requests/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.token}`
        },
        ...init
    });
}*/
