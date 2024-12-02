import {useEffect, useState} from "react";
import {BeatmapsetListing} from "@/types/beatmapsets/beatmapset";
import {BeatmapsetListingOptions, getBeatmapsets} from "@/services/beatmapsetService";
import {useSorting} from "@/context/beatmapsets/BeatmapsetListSortingContext";
import {useFilters} from "@/context/beatmapsets/BeatmapsetListFiltersContext";

const useBeatmapsets = (page: number) => {
    const [beatmapsets, setBeatmapsets] = useState<BeatmapsetListing[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(false);

    const {layersToUse} = useSorting();
    const {filtersToUse} = useFilters();

    useEffect(() => {
        const options: BeatmapsetListingOptions = {
            filters: filtersToUse,
            sortingLayers: layersToUse
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
    }, [page, layersToUse, filtersToUse]);

    return {beatmapsets, loading, error, hasMore}
}

export default useBeatmapsets;
