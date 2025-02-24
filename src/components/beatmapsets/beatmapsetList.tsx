"use client";

import React, { FC } from "react";
import useSWRBeatmapsets from "@/hooks/useSWRBeatmapsets";
import BeatmapsetPanel from "@/components/beatmapsets/panels/beatmapsetPanel";
import BeatmapsetPanelSkeleton from "@/components/beatmapsets/panels/beatmapsetPanelSkeleton";
import { useSorting } from "@/context/beatmapsets/SortingContext";
import { useFilters } from "@/context/beatmapsets/FiltersContext";
import { useSearch } from "@/context/beatmapsets/SearchContext";
import ListControls from "@/components/shared/lists/listControls";
import { FilterChipList } from "@/components/shared/filterChipList";
import clsx from "clsx";
import InfiniteScroll from "react-infinite-scroll-component";
import BeatmapsetGroup from "@/components/beatmapsets/beatmapsetGroup";

interface BeatmapsetsProps {
    title: string;
    queueId?: number;
    showControls?: boolean;
    showGrouping?: boolean;
    showViewSwitch?: boolean;
    showSearch?: boolean;
    showFilters?: boolean;
    showSorting?: boolean;
    editMode?: boolean;
}

type View = "list" | "grid";

export type BeatmapsetListGroup = "artist" | "mapper" | null;

const BeatmapsetList: FC<BeatmapsetsProps> = ({
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
    const id = title?.toLowerCase().replace(" ", "-");

    //#region Controls
    const [view, setView] = React.useState<View>(editMode ? "list" : "grid");

    if (editMode) {
        showViewSwitch = false;
    }

    showControls = showControls && (showGrouping && showViewSwitch && showSearch && showFilters && showSorting);
    //#endregion

    //#region Hooks

    const { search } = useSearch();
    const { filtersToUse } = useFilters();
    const { currentLayers } = useSorting();

    const { beatmapsets, error, size, setSize, isReachingEnd } = useSWRBeatmapsets({
        limit: 10,
        filters: filtersToUse,
        sortingLayers: currentLayers,
        searchQuery: search,
        queueId: queueId
    });

    //#endregion

    //#region Beatmapset Grouping

    const [grouping, setGrouping] = React.useState<BeatmapsetListGroup>(null);

    // Group beatmapsets by artist, title or mapper
    const groupedBeatmapsets = beatmapsets?.reduce((groups, beatmapset) => {
        if (!grouping) {
            return groups;
        }

        const groupKey = ({
            artist: beatmapset.beatmapset_snapshot.artist,
            title: beatmapset.beatmapset_snapshot.title,
            mapper: beatmapset.beatmapset_snapshot.creator
        })[grouping];

        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }

        groups[groupKey].push(beatmapset);

        return groups;
    }, {} as Record<string, typeof beatmapsets>);

    //#endregion

    if (error) {
        return (
            <div className="text-center text-2xl font-semibold text-red-500">
                Failed to load beatmapsets
            </div>
        );
    }

    return (
        <div id={id} className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row justify-between gap-2">
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

            <div id="scrollable-div">
                <InfiniteScroll next={() => setSize(size + 1)}
                                hasMore={!isReachingEnd}
                                loader={<BeatmapsetPanelSkeleton view={view} />}
                                dataLength={beatmapsets?.length || 0}
                                className={clsx(
                                    `gap-4 overflow-visible`,
                                    view === "grid" && !grouping ? `grid grid-cols-[repeat(auto-fill,_minmax(18rem,_1fr))]` : `flex flex-col`
                                )}
                                scrollableTarget={"scrollable-div"}
                                scrollThreshold={0.9}
                >
                    {
                        grouping ? (
                            Object.entries(groupedBeatmapsets || []).map(([artist, beatmapsets]) => (
                                <BeatmapsetGroup title={artist} beatmapsets={beatmapsets} view={view} key={artist}
                                                 editMode={editMode} />
                            ))
                        ) : (
                            beatmapsets?.map((beatmapset) => (
                                    <BeatmapsetPanel key={beatmapset.id} beatmapset={beatmapset} view={view}
                                                     editMode={editMode} />
                                )
                            )
                        )
                    }
                </InfiniteScroll>
            </div>

        </div>
    );
};

export default BeatmapsetList;
