"use client";

import React, { FC } from "react";
import useSWRRequests from "@/hooks/useSWRRequests";
import { useSorting } from "@/context/beatmapsets/SortingContext";
import clsx from "clsx";
import { useFilters } from "@/context/beatmapsets/FiltersContext";
import { useSearch } from "@/context/beatmapsets/SearchContext";
import RequestPanel from "@/components/requests/panels/requestPanel";
import ListControls from "@/components/shared/lists/listControls";
import RequestGroup from "@/components/requests/requestGroup";
import { FilterChipList } from "@/components/shared/filterChipList";
import BeatmapsetPanelSkeleton from "@/components/beatmapsets/panels/beatmapsetPanelSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";

interface RequestListProps {
    title: string;
    queueId?: number;
    showControls?: boolean;
    showGrouping?: boolean;
    showViewSwitch?: boolean;
    showSearch?: boolean;
    showFilters?: boolean;
    showSorting?: boolean;
    editMode?: boolean;
    pagination?: boolean;
}

type View = "list" | "grid";

export type GroupKey = "artist" | "mapper" | null;

const RequestList: FC<RequestListProps> = ({
                                               title,
                                               queueId,
                                               showControls = true,
                                               showGrouping = true,
                                               showViewSwitch = true,
                                               showSearch = true,
                                               showSorting = true,
                                               showFilters = true,
                                               editMode
                                           }) => {
    const id = title?.toLowerCase().replace(" ", "-") + `-${queueId}`;

    //#region Controls
    const [view, setView] = React.useState<View>(editMode ? "list" : "grid");

    if (editMode) {
        showViewSwitch = false;
    }

    showControls = showControls || (showGrouping && showViewSwitch && showSearch && showFilters && showSorting);

    //#endregion

    //#region Hooks

    const { search } = useSearch();
    const { filtersToUse } = useFilters();
    const { layersToUse } = useSorting();

    const { requests, error, size, setSize, isReachingEnd } = useSWRRequests({
        limit: 10,
        filters: filtersToUse,
        sortingLayers: layersToUse,
        searchQuery: search,
        queueId: queueId
    });

    //#endregion

    //#region Beatmapset Grouping

    const [grouping, setGrouping] = React.useState<GroupKey>(null);

    const groupedRequests = requests.reduce((groups, request) => {
        if (!grouping) {
            return groups;
        }

        const groupKey = ({
            "artist": request.beatmapset_snapshot.artist,
            "mapper": request.beatmapset_snapshot.creator
        })[grouping];

        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }

        groups[groupKey].push(request);

        return groups;
    }, {} as Record<string, typeof requests>);

    //#endregion

    if (error) {
        return (
            <div className="text-center text-2xl font-semibold text-red-500">
                {error.toString()}
            </div>
        );
    }

    return (
        <div id={id} className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row justify-between gap-4 rounded-xl">
                <div className="text-2xl font-semibold truncate transition-all duration-300 ease-in-out">
                    {title}
                </div>

                <ListControls
                    id={id}
                    showControls={showControls}
                    showViewSwitch={showViewSwitch}
                    view={view}
                    setView={setView}
                    showGrouping={showGrouping}
                    grouping={grouping}
                    setGrouping={setGrouping}
                    showSearch={showSearch}
                    showFilters={showFilters}
                    showSorting={showSorting}
                />
            </div>

            <FilterChipList />

            <InfiniteScroll next={() => setSize(size + 1)}
                            hasMore={!isReachingEnd}
                            loader={<BeatmapsetPanelSkeleton view={view} />}
                            dataLength={requests?.length || 0}
                            className={clsx(
                                `gap-4`,
                                view === "grid" && !grouping ? `grid grid-cols-[repeat(auto-fill,_minmax(18rem,_1fr))]` : `flex flex-col`
                            )}
                            scrollThreshold={0.9}
            >
                {
                    grouping ? (
                        Object.entries(groupedRequests || []).map(([artist, requests]) => (
                            <RequestGroup title={artist} requests={requests} view={view} key={artist}
                                          editMode={editMode} />
                        ))
                    ) : (
                        requests?.map((request) => (
                                <RequestPanel key={request.id} request={request} view={view}
                                              editMode={editMode} />
                            )
                        )
                    )
                }
            </InfiniteScroll>
        </div>
    );
};

export default RequestList;
