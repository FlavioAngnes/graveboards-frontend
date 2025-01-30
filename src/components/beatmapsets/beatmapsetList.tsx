'use client';

import React, {FC, useEffect, useRef} from 'react';
import useBeatmapsets from "@/hooks/useBeatmapsets";
import BeatmapsetPanel from "@/components/beatmapsets/panels/beatmapsetPanel";
import BeatmapsetPanelSkeleton from "@/components/beatmapsets/panels/beatmapsetPanelSkeleton";
import {useSorting} from "@/context/beatmapsets/SortingContext";
import clsx from "clsx";
import {useFilters} from "@/context/beatmapsets/FiltersContext";
import BeatmapsetGroup from "@/components/beatmapsets/beatmapsetGroup";
import {useSearch} from "@/context/beatmapsets/SearchContext";
import ListControls from "@/components/shared/lists/listControls";
import { FilterChipList } from "@/components/shared/filterChipList";

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

type View = 'list' | 'grid';

export type BeatmapsetListGroup = 'artist' | 'mapper' | null;

const BeatmapsetList: FC<BeatmapsetsProps> = ({
                                                  title,
                                                  queueId,
                                                  showControls = true,
                                                  showGrouping = true,
                                                  showViewSwitch = true,
                                                  showSearch = true,
                                                  showSorting = true,
                                                  showFilters = true,
                                                  editMode = false
                                              }) => {
    const id = title?.toLowerCase().replace(' ', '-');

    //#region Controls
    const [view, setView] = React.useState<View>(editMode ? 'list' : 'grid');

    if (editMode) {
        showViewSwitch = false;
    }

    showControls = showControls || (showGrouping && showViewSwitch && showSearch && showFilters && showSorting);

    //#endregion

    //#region Pagination

    const [page, setPage] = React.useState(0);

    //#endregion

    //#region Hooks

    const {beatmapsets, isLoading, hasMore, error} = useBeatmapsets(page, queueId);

    const {search} = useSearch();
    const {filtersToUse} = useFilters();
    const {layersToUse} = useSorting();

    //#endregion

    //#region Beatmapset Grouping

    const [grouping, setGrouping] = React.useState<BeatmapsetListGroup>(null);

    // Group beatmapsets by artist, title or mapper
    const groupedBeatmapsets = beatmapsets.reduce((groups, beatmapset) => {
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

    //#region Infinite scroll

    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isLoading) return;

        if (observerRef.current) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage(prev => prev + 1);
                }
            }, {
                threshold: 0.5
            });

            observer.observe(observerRef.current);

            return () => {
                observer.disconnect();
            }
        }
    }, [isLoading, hasMore]);

    // Reset page when search, filters or sorting changes
    useEffect(() => {
        setPage(0);
    }, [layersToUse, filtersToUse, search]);

    //#endregion

    if (error) {
        return (
            <div className="text-center text-2xl font-semibold text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div id={id} className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row justify-between gap-2">
                <div className="text-2xl font-semibold truncate transition-all duration-300 ease-in-out">
                    {title}
                </div>

                {
                    showControls && (
                        <ListControls
                            id={id}
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
                    )
                }

            </div>

            <FilterChipList/>

            <div
                className={clsx(
                    `gap-4`,
                    view === 'grid' && !grouping ? `grid grid-cols-[repeat(auto-fill,_minmax(18rem,_1fr))]` : `flex flex-col`
                )}
            >
                {
                    grouping ? (
                        Object.entries(groupedBeatmapsets).map(([artist, beatmaps]) => (
                            <BeatmapsetGroup title={artist} beatmapsets={beatmaps} view={view} key={artist} editMode={editMode}/>
                        ))
                    ) : (
                        beatmapsets.map((beatmap) => (
                                <BeatmapsetPanel key={beatmap.id} beatmapset={beatmap} view={view} editMode={editMode}/>
                            )
                        )
                    )
                }

                {(isLoading || hasMore) && (
                    <div ref={observerRef}>
                        <BeatmapsetPanelSkeleton view={view}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BeatmapsetList;
