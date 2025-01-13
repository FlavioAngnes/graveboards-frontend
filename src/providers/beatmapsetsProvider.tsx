import {FC, ReactNode} from "react";
import {BeatmapsetListSortingProvider} from "@/context/beatmapsets/BeatmapsetListSortingContext";
import BeatmapsetList from "@/components/beatmapsets/beatmapsetList";
import {BeatmapsetListSortingLayerOptions} from "@/types/beatmapsets/sorting";
import {BeatmapsetListFiltersProvider} from "@/context/beatmapsets/BeatmapsetListFiltersContext";
import {BeatmapsetListFilterOptions} from "@/types/beatmapsets/filters";
import {BeatmapsetListSearchProvider} from "@/context/beatmapsets/BeatmapsetListSearchContext";

export const BeatmapsetsProvider: FC<{
    title?: string,
    defaultFilters?: Required<BeatmapsetListFilterOptions<never>>[];
    defaultSortingLayers?: Required<BeatmapsetListSortingLayerOptions>[];
    queueId?: number;
    showControls?: boolean;
    children?: ReactNode;
}> = ({
          title = 'Beatmapsets',
          defaultFilters = [],
          defaultSortingLayers = [],
          queueId,
          showControls = true,
      }) => {
    return (
        <BeatmapsetListFiltersProvider defaultFilters={defaultFilters}>
            <BeatmapsetListSortingProvider defaultSortingLayers={defaultSortingLayers}>
                <BeatmapsetList title={title} showControls={showControls} queueId={queueId}/>
                <BeatmapsetListSearchProvider>
                </BeatmapsetListSearchProvider>
            </BeatmapsetListSortingProvider>
        </BeatmapsetListFiltersProvider>
    )
}
