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
    showGrouping?: boolean;
    showViewSwitch?: boolean;
    showSearch?: boolean;
    showFilters?: boolean;
    showSorting?: boolean;
    children?: ReactNode;
}> = ({
          title = 'Beatmapsets',
          defaultFilters = [],
          defaultSortingLayers = [],
          queueId,
          showGrouping = true,
          showViewSwitch = true,
          showSearch = true,
          showFilters = true,
          showSorting = true,
      }) => {
    return (
        <BeatmapsetListFiltersProvider defaultFilters={defaultFilters}>
            <BeatmapsetListSortingProvider defaultSortingLayers={defaultSortingLayers}>
                <BeatmapsetListSearchProvider>
                    <BeatmapsetList title={title}
                                    queueId={queueId}
                                    showGrouping={showGrouping}
                                    showViewSwitch={showViewSwitch}
                                    showSearch={showSearch}
                                    showFilters={showFilters}
                                    showSorting={showSorting}
                    />
                </BeatmapsetListSearchProvider>
            </BeatmapsetListSortingProvider>
        </BeatmapsetListFiltersProvider>
    )
}
