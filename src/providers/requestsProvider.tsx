import {FC, ReactNode} from "react";
import {BeatmapsetListSortingProvider} from "@/context/beatmapsets/BeatmapsetListSortingContext";
import {BeatmapsetListSortingLayerOptions} from "@/types/beatmapsets/sorting";
import {BeatmapsetListFiltersProvider} from "@/context/beatmapsets/BeatmapsetListFiltersContext";
import {BeatmapsetListFilterOptions} from "@/types/beatmapsets/filters";
import {BeatmapsetListSearchProvider} from "@/context/beatmapsets/BeatmapsetListSearchContext";
import RequestList from "@/components/requests/requestList";

interface RequestsProviderProps {
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
    editable?: boolean;
}

export const RequestsProvider: FC<RequestsProviderProps> = ({
          title = 'Requests',
          defaultFilters = [],
          defaultSortingLayers = [],
          queueId,
          showGrouping = true,
          showViewSwitch = true,
          showSearch = true,
          showFilters = true,
          showSorting = true,
          editable = false
      }) => {
    return (
        <BeatmapsetListFiltersProvider defaultFilters={defaultFilters}>
            <BeatmapsetListSortingProvider defaultSortingLayers={defaultSortingLayers}>
                <BeatmapsetListSearchProvider>
                    <RequestList title={title}
                                    queueId={queueId}
                                    showGrouping={showGrouping}
                                    showViewSwitch={showViewSwitch}
                                    showSearch={showSearch}
                                    showFilters={showFilters}
                                    showSorting={showSorting}
                                    editable={editable}
                    />
                </BeatmapsetListSearchProvider>
            </BeatmapsetListSortingProvider>
        </BeatmapsetListFiltersProvider>
    )
}
