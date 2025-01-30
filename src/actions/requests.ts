"use server";

import { verifySession } from "@/actions/session";
import { BeatmapsetRequest } from "@/types/requests/request";
import { FilterType } from "@/types/filters";
import { ListingOptions } from "@/actions/beatmapsets";

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

export const getRequests = async (page: number, options: ListingOptions) => {
    const session = await verifySession();

    if (!session) {
        return [];
    }

    const searchParams = new URLSearchParams();

    const groupedFilters: Record<string, Record<string, FilterType<unknown>>> = {};

    for (const filter of options.filters || []) {
        const [type, filterName] = filter.value.split(".");

        if (!type || !filterName) {
            throw new Error(`Invalid filter value: ${filter.value}`);
        }

        // Initialize type group if it doesn't exist
        if (!groupedFilters[type]) {
            groupedFilters[type] = {};
        }

        // Add the filter name and options to the type group
        groupedFilters[type][filterName] = {
            ...groupedFilters[type][filterName],
            ...filter.options
        };
    }

    Object.entries(groupedFilters).forEach(([type, filtersByType]) => {
        searchParams.append(type, JSON.stringify(filtersByType));
    });

    for (const sorting of options.sortingLayers || []) {
        searchParams.append(`sorting`, sorting.value);
        searchParams.append(`sort_orders`, sorting.order);
    }

    if (options.search && options.search.length > 0) searchParams.append("search_query", options.search);

    if (options.queueId) searchParams.append("queue_id", options.queueId.toString());

    searchParams.append("limit", (options.limit || 10).toString());
    searchParams.append("offset", ((options.offset || 0) + page * (options.limit || 10)).toString());

    const response = await fetch(`${API_URL}/requests/listings?${searchParams}`, {
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
