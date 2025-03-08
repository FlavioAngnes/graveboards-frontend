import { ListingOptions } from "@/types/beatmapsets/beatmapset";
import { BeatmapsetRequest } from "@/types/requests/request";
import { getListingSearchParams } from "@/hooks/useSWRBeatmapsets";
import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/utils/fetcher";

const useSWRRequests = ({filters, sortingLayers, searchQuery, queueId, limit, offset}: ListingOptions) => {
    const getKey = (pageIndex: number) => {
        const searchParams = getListingSearchParams(filters, sortingLayers, searchQuery, queueId);

        // Add pagination
        limit = limit || 10;
        offset = (offset || 0) + pageIndex * limit;

        searchParams.append("limit", limit.toString());
        searchParams.append("offset", offset.toString());

        return `/api/requests/listings?${searchParams}`;
    };

    const { data, error, isLoading, isValidating, mutate, size, setSize } = useSWRInfinite<BeatmapsetRequest[]>(getKey, fetcher);

    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd = isEmpty || Boolean(data && data[data.length - 1]?.length < (limit || 10));

    return { requests: data ? data.flat() : [], error, isLoading, isValidating, mutate, size, setSize, isReachingEnd };
};

export default useSWRRequests;
