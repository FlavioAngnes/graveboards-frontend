'use server';

import {BeatmapsetListSortingLayer} from "@/types/beatmapsets/sorting";
import {BeatmapsetListFilterOptions} from "@/types/beatmapsets/filters";
import {FilterType} from "@/types/filters";
import { BeatmapsetListing } from "@/types/beatmapsets/beatmapset";

const {API_URL} = process.env;

if (!API_URL) {
    throw new Error(
        'Please define the API_URL environment variable inside .env.local'
    )
}

export interface Pagination {
    limit?: number;
    offset?: number;
}

export interface BeatmapsetListingOptions extends Pagination {
    search?: string;
    filters?: BeatmapsetListFilterOptions<unknown>[];
    sortingLayers?: BeatmapsetListSortingLayer[];
    queueId?: number;
}

export const getBeatmapsets = async (page: number, options: BeatmapsetListingOptions) => {
    const searchParams = new URLSearchParams();

    const groupedFilters: Record<string, Record<string, FilterType<unknown>>> = {};

    for (const filter of options.filters || []) {
        const [type, filterName] = filter.value.split('.')

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
            ...filter.options,
        };
    }

    Object.entries(groupedFilters).forEach(([type, filtersByType]) => {
        searchParams.append(type, JSON.stringify(filtersByType));
    });

    for (const sorting of options.sortingLayers || []) {
        searchParams.append(`sorting`, sorting.value);
        searchParams.append(`sort_orders`, sorting.order);
    }

    if (options.search && options.search.length > 0) searchParams.append('search_query', options.search);

    if (options.queueId) searchParams.append('queue_id', options.queueId.toString());

    searchParams.append('limit', (options.limit || 10).toString());
    searchParams.append('offset', ((options.offset || 0) + page * (options.limit || 10)).toString());

    const response = await fetch(`${API_URL}/beatmapsets/listings?${searchParams}`);

    if (!response.ok) {
        throw new Error('Failed to fetch beatmapsets.');
    }

    return await response.json() as BeatmapsetListing[];
}
