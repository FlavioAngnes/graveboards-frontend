import {useEffect, useState} from "react";
import {ListingOptions, getBeatmapsets} from "@/actions/beatmapsets";
import {useSorting} from "@/context/beatmapsets/SortingContext";
import {useFilters} from "@/context/beatmapsets/FiltersContext";
import {useSearch} from "@/context/beatmapsets/SearchContext";
import {Beatmapset} from "@/types/beatmapsets/beatmapset";

const useBeatmapsets = (page: number, queueId?: number) => {
    const [beatmapsets, setBeatmapsets] = useState<Beatmapset[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {layersToUse} = useSorting();
    const {filtersToUse} = useFilters();
    const {search} = useSearch();

    useEffect(() => {
        const options: ListingOptions = {
            search: search,
            filters: filtersToUse,
            sortingLayers: layersToUse,
            queueId: queueId
        }

        setIsLoading(true);
        setError(null);

        getBeatmapsets(page, options)
            .then(data => {
                if (page === 0) {
                    setBeatmapsets(data);
                } else {
                    setBeatmapsets((prev) => [...prev, ...data]);
                }

                setIsLoading(false);
                setHasMore(!!data.length && data.length === 10);
            })
            .catch(e => {
                setIsLoading(false);
                setError(e.message);
            })
    }, [page, layersToUse, filtersToUse, search, queueId]);

    return {beatmapsets, isLoading, hasMore, error}
}

export default useBeatmapsets;
