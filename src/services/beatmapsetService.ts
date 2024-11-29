import {SortingLayerOptions} from "@/types/beatmapsets/Sorting";
import {BeatmapsetListingFilters} from "@/types/Filters";
import {BeatmapsetListing} from "@/types/beatmapsets/Beatmapset";

export interface BeatmapsetListingOptions {
    search?: string;
    filters?: BeatmapsetListingFilters;
    sortingLayers?: SortingLayerOptions[];
    limit?: number;
    offset?: number;
    queueId?: number;
}

export const getBeatmapsets = async (page: number, options: BeatmapsetListingOptions, init?: RequestInit): Promise<BeatmapsetListing[]> => {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(options.filters || {})) {
        searchParams.append(key, JSON.stringify(value));
    }

    for (const sorting of options.sortingLayers || []) {
        searchParams.append(`sorting`, sorting.value);
        searchParams.append(`sort_orders`, sorting.order);
    }

    if (options.search && options.search.length > 0) searchParams.append('search_query', options.search);

    if (options.queueId) searchParams.append('queue_id', options.queueId.toString());

    searchParams.append('limit', (options.limit || 10).toString());
    searchParams.append('offset', ((options.offset || 0) + page * (options.limit || 10)).toString());

    const response = await fetch(`/api/beatmapsets/listings?${searchParams}`, init);

    return await response.json() as BeatmapsetListing[];
}
