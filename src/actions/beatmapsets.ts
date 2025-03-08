'use server';

import { Beatmapset } from "@/types/beatmapsets/beatmapset";

const {API_URL} = process.env;

if (!API_URL) {
    throw new Error(
        'Please define the API_URL environment variable inside .env.local'
    )
}

export const getBeatmapsets = async (params: URLSearchParams) => {
    const response = await fetch(`${API_URL}/beatmapsets/listings?${params}`);

    if (!response.ok) {
        throw new Error('Failed to fetch beatmapsets.');
    }

    return await response.json() as Beatmapset[];
}
