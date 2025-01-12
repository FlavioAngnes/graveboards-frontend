import {Queue} from "@/types/queue";

export interface BeatmapsetListingOptions {
    limit?: number;
    offset?: number;
}

export const getQueues = async (page: number, options: BeatmapsetListingOptions, init?: RequestInit): Promise<Queue[]> => {
    const searchParams = new URLSearchParams();

    searchParams.append('limit', (options.limit || 10).toString());
    searchParams.append('offset', ((options.offset || 0) + page * (options.limit || 10)).toString());

    const token = localStorage.getItem('token');

    if (token) {
        init = {
            ...init,
            headers: {
                ...init?.headers,
                Authorization: `Bearer ${token}`
            }
        }
    }

    const response = await fetch(`/api/queues?${searchParams}`, init);

    return await response.json() as Queue[];
}

export const getQueue = async (id: number, init?: RequestInit): Promise<Queue> => {
    const token = localStorage.getItem('token');

    if (token) {
        init = {
            ...init,
            headers: {
                ...init?.headers,
                Authorization: `Bearer ${token}`
            }
        }
    }

    const response = await fetch(`/api/queues/${id}`, init);

    return await response.json() as Queue;
}
