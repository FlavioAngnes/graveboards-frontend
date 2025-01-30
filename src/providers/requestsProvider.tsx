import {FC, ReactNode} from "react";
import {SortingProvider} from "@/context/beatmapsets/SortingContext";
import {BeatmapsetListSortingLayer} from "@/types/beatmapsets/sorting";
import {FiltersProvider} from "@/context/beatmapsets/FiltersContext";
import {BeatmapsetListFilterOptions} from "@/types/beatmapsets/filters";
import {SearchProvider} from "@/context/beatmapsets/SearchContext";
import RequestList from "@/components/requests/requestList";

interface RequestsProviderProps {
    title?: string,
    defaultFilters?: Required<BeatmapsetListFilterOptions<unknown>>[];
    defaultSortingLayers?: Required<BeatmapsetListSortingLayer>[];
    queueId?: number;
    showControls?: boolean;
    showGrouping?: boolean;
    showViewSwitch?: boolean;
    showSearch?: boolean;
    showFilters?: boolean;
    showSorting?: boolean;
    children?: ReactNode;
    editMode?: boolean;
    pagination?: boolean;
}

export const RequestsProvider: FC<RequestsProviderProps> = ({
                                                                title = 'Requests',
                                                                defaultFilters = [],
                                                                defaultSortingLayers = [],
                                                                queueId,
                                                                showControls = true,
                                                                showGrouping = true,
                                                                showViewSwitch = true,
                                                                showSearch = true,
                                                                showFilters = true,
                                                                showSorting = true,
                                                                editMode = false,
                                                                pagination = false,
                                                            }) => {
    return (
        <FiltersProvider defaultFilters={defaultFilters}>
            <SortingProvider defaultSortingLayers={defaultSortingLayers}>
                <SearchProvider>
                    <RequestList title={title}
                                 queueId={queueId}
                                 showControls={showControls}
                                 showGrouping={showGrouping}
                                 showViewSwitch={showViewSwitch}
                                 showSearch={showSearch}
                                 showFilters={showFilters}
                                 showSorting={showSorting}
                                 editMode={editMode}
                                 pagination={pagination}
                    />
                </SearchProvider>
            </SortingProvider>
        </FiltersProvider>
    )
}
