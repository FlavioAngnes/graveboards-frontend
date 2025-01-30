import { useEffect, useState } from "react";
import { ListingOptions } from "@/actions/beatmapsets";
import { useSorting } from "@/context/beatmapsets/SortingContext";
import { useFilters } from "@/context/beatmapsets/FiltersContext";
import { useSearch } from "@/context/beatmapsets/SearchContext";
import { getRequests } from "@/actions/requests";
import { BeatmapsetRequest } from "@/types/requests/request";

const useRequests = (page: number, queueId?: number) => {
    const [requests, setRequests] = useState<BeatmapsetRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { layersToUse } = useSorting();
    const { filtersToUse } = useFilters();
    const { search } = useSearch();

    useEffect(() => {
        const options: ListingOptions = {
            search: search,
            filters: filtersToUse,
            sortingLayers: layersToUse,
            queueId: queueId
        };

        setIsLoading(true);
        setError(null);

        getRequests(page, options)
            .then(data => {
                if (page === 0) {
                    setRequests(data);
                } else {
                    setRequests((prev) => [...prev, ...data]);
                }

                setIsLoading(false);
                setHasMore(!!data.length && data.length === 10);
            })
            .catch(e => {
                setIsLoading(false);
                setError(e.message);
            });
    }, [page, layersToUse, filtersToUse, search, queueId]);

    return { requests: requests, isLoading, hasMore, error };
};

export default useRequests;
