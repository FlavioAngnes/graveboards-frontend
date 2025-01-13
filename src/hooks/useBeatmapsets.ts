import {useEffect, useState} from "react";
import {BeatmapsetListing} from "@/types/beatmapsets/beatmapset";
import {BeatmapsetListingOptions, getBeatmapsets} from "@/services/beatmapsetService";
import {useSorting} from "@/context/beatmapsets/BeatmapsetListSortingContext";
import {useFilters} from "@/context/beatmapsets/BeatmapsetListFiltersContext";
import {useSearch} from "@/context/beatmapsets/BeatmapsetListSearchContext";

const useBeatmapsets = (page: number, queueId?: number) => {
    const [beatmapsets, setBeatmapsets] = useState<BeatmapsetListing[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(false);

    const {layersToUse} = useSorting();
    const {filtersToUse} = useFilters();
    const {search} = useSearch();

    useEffect(() => {
        const options: BeatmapsetListingOptions = {
            search: search,
            filters: filtersToUse,
            sortingLayers: layersToUse,
            queueId: queueId
        }

        setLoading(true);
        setError(null);

        const controller = new AbortController();
        const {signal} = controller;

        getBeatmapsets(page, options, {signal})
            .then(data => {
                if (page === 0) {
                    setBeatmapsets(data);
                } else {
                    setBeatmapsets((prev) => [...prev, ...data]);
                }
                setHasMore(!!data.length);
                setLoading(false);
            })
            .catch(e => {
                setLoading(false);
                if (signal.aborted) return;
                setError(e.message);
            })

        return () => controller.abort();
    }, [page, layersToUse, filtersToUse, search, queueId]);

    return {beatmapsets, loading, error, hasMore}
}

export default useBeatmapsets;
