import { ListingOptions } from "@/types/beatmapsets/beatmapset";
import { Beatmapset } from "@/types/beatmapsets/beatmapset";
import useSWRInfinite from "swr/infinite";
import { FilterType } from "@/types/filters";
import { fetcher } from "@/utils/fetcher";
import { FilterOptions } from "@/types/beatmapsets/filters";
import { Sorting } from "@/types/beatmapsets/sorting";

export const getGroupedFilters = (filters: FilterOptions<unknown>[]) => {
    if (filters.length === 0) {
        return {};
    }

    const filterGroups: Record<string, Record<string, FilterType<unknown>>> = {};

    for (const filter of filters) {
        const [type, filterName] = filter.value.split(".");

        if (!type || !filterName) {
            throw new Error(`Invalid filter value: ${filter.value}`);
        }

        // Initialize type group if it doesn't exist
        if (!filterGroups[type]) {
            filterGroups[type] = {};
        }

        // Add the filter name and options to the type group
        filterGroups[type][filterName] = {
            ...filterGroups[type][filterName],
            ...filter.options
        };
    }

    return filterGroups;
};

export const getListingSearchParams = (filters?: FilterOptions<unknown>[], sortingLayers?: Sorting[], searchQuery?: string, queueId?: number) => {
    const searchParams = new URLSearchParams();

    // Group filters by type
    const groupedFilters = getGroupedFilters(filters || []);

    Object.entries(groupedFilters).forEach(([type, filtersByType]) => {
        searchParams.append(type, JSON.stringify(filtersByType));
    });

    // Add sorting layers
    for (const sorting of sortingLayers || []) {
        searchParams.append(`sorting`, sorting.value);
        searchParams.append(`sort_orders`, sorting.order);
    }

    // Add search query
    if (searchQuery && searchQuery.length > 0) searchParams.append("search_query", searchQuery);

    // Add queue id
    if (queueId) searchParams.append("queue_id", queueId.toString());

    return searchParams;
};

const useSWRBeatmapsets = ({ filters, sortingLayers, searchQuery, queueId, limit, offset }: ListingOptions) => {
    const getKey = (pageIndex: number) => {
        const searchParams = getListingSearchParams(filters, sortingLayers, searchQuery, queueId);

        // Add pagination
        limit = limit || 10;
        offset = (offset || 0) + pageIndex * limit;

        searchParams.append("limit", limit.toString());
        searchParams.append("offset", offset.toString());

        return `/api/beatmapsets/listings?${searchParams}`;
    };

    const {
        data,
        error,
        isLoading,
        isValidating,
        mutate,
        size,
        setSize
    } = useSWRInfinite<Beatmapset[]>(getKey, fetcher);

    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd = isEmpty || Boolean(data && data[data.length - 1]?.length < (limit || 10));

    return { beatmapsets: data ? data.flat() : [], error, isLoading, isValidating, mutate, size, setSize, isReachingEnd };
};

export default useSWRBeatmapsets;
