import {FC, ReactNode} from "react";
import {SortingProvider} from "@/context/beatmapsets/SortingContext";
import BeatmapsetList from "@/components/beatmapsets/beatmapsetList";
import {BeatmapsetListSortingLayer} from "@/types/beatmapsets/sorting";
import {FiltersProvider} from "@/context/beatmapsets/FiltersContext";
import {BeatmapsetListFilterOptions} from "@/types/beatmapsets/filters";
import {SearchProvider} from "@/context/beatmapsets/SearchContext";

interface BeatmapsetsProviderProps {
    title?: string,
    defaultFilters?: Required<BeatmapsetListFilterOptions<never>>[];
    defaultSortingLayers?: Required<BeatmapsetListSortingLayer>[];
    queueId?: number;
    showGrouping?: boolean;
    showViewSwitch?: boolean;
    showSearch?: boolean;
    showFilters?: boolean;
    showSorting?: boolean;
    children?: ReactNode;
}

export const BeatmapsetsProvider: FC<BeatmapsetsProviderProps> = ({
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
        <FiltersProvider defaultFilters={defaultFilters}>
            <SortingProvider defaultSortingLayers={defaultSortingLayers}>
                <SearchProvider>
                    <BeatmapsetList title={title}
                                    queueId={queueId}
                                    showGrouping={showGrouping}
                                    showViewSwitch={showViewSwitch}
                                    showSearch={showSearch}
                                    showFilters={showFilters}
                                    showSorting={showSorting}
                    />
                </SearchProvider>
            </SortingProvider>
        </FiltersProvider>
    )
}
