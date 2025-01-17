'use client';

import React, {FC, useEffect, useRef} from 'react';
import useBeatmapsets from "@/hooks/useBeatmapsets";
import {useSorting} from "@/context/beatmapsets/BeatmapsetListSortingContext";
import clsx from "clsx";
import {useFilters} from "@/context/beatmapsets/BeatmapsetListFiltersContext";
import {useSearch} from "@/context/beatmapsets/BeatmapsetListSearchContext";
import RequestPanel from "@/components/requests/panels/requestPanel";
import ListControls from "@/components/shared/lists/listControls";
import Button from "@/components/shared/button";
import RequestGroup from "@/components/requests/requestGroup";
import RequestPanelSkeleton from "@/components/requests/panels/requestPanelSkeleton";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/md";
import {FilterChipList} from "@/components/shared/filterChipList";

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

type View = 'list' | 'grid';

export type BeatmapsetListGroup = 'artist' | 'mapper' | null;

const RequestList: FC<RequestListProps> = ({
                                               title,
                                               queueId,
                                               showControls = true,
                                               showGrouping = true,
                                               showViewSwitch = true,
                                               showSearch = true,
                                               showSorting = true,
                                               showFilters = true,
                                               editMode = false,
                                               pagination = false
                                           }) => {
    const id = title?.toLowerCase().replace(' ', '-') + `-${queueId}`;

    //#region Controls
    const [view, setView] = React.useState<View>(editMode ? 'list' : 'grid');

    if (editMode) {
        showViewSwitch = false;
    }

    if (pagination) {
        showGrouping = false;
    }

    showControls = showControls || (showGrouping && showViewSwitch && showSearch && showFilters && showSorting);

    //#endregion

    //#region Pagination

    const [page, setPage] = React.useState(0);

    //#endregion

    //#region Hooks

    const {beatmapsets, loading, error, hasMore} = useBeatmapsets(page, queueId);

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
        if (loading || pagination) return;

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
    }, [loading, hasMore, pagination]);

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
            <div className="flex flex-col lg:flex-row justify-between gap-4 rounded-xl">
                <div className="text-2xl font-semibold truncate transition-all duration-300 ease-in-out">
                    {title}
                </div>

                <ListControls
                    id={id}
                    grouping={grouping}
                    setGrouping={setGrouping}
                    showGrouping={showGrouping}
                    view={view}
                    setView={setView}
                    showViewSwitch={showViewSwitch}
                    showSearch={showSearch}
                    showFilters={showFilters}
                    showSorting={showSorting}
                    showControls={showControls}
                />
            </div>

            <FilterChipList/>

            <div
                className={clsx(
                    {'flex flex-col': grouping},
                    view === 'grid' && !grouping ? `grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-4` : `flex flex-col gap-2`
                )}
            >
                {
                    grouping ? (
                        Object.entries(groupedBeatmapsets).map(([key, beatmapsets]) => (
                            <RequestGroup title={key} beatmapsets={beatmapsets} view={view} key={key}/>
                        ))
                    ) : (
                        pagination ? (
                            beatmapsets.slice(page * 10, (page + 1) * 10).map((beatmapset) => (
                                <RequestPanel key={beatmapset.id} beatmapset={beatmapset} view={view}
                                              editMode={editMode}/>
                            ))
                        ) : (
                            beatmapsets.map((beatmapset) => (
                                <RequestPanel key={beatmapset.id} beatmapset={beatmapset} view={view}
                                              editMode={editMode}/>
                            ))
                        )
                    )

                }

                {(loading || hasMore) && (
                    <div ref={observerRef}>
                        <RequestPanelSkeleton view={view}/>
                    </div>
                )}
            </div>

            {
                pagination && (
                    <div className="flex justify-center items-center gap-2">
                        <Button
                            size="sm"
                            rounded="full"
                            onClick={() => setPage(prev => prev - 1)} disabled={page === 0}
                                className="px-3">
                            <MdKeyboardArrowLeft/>
                            Previous
                        </Button>
                        <span className="text-tertiary-500 dark:text-tertiary-400">
                            Page <span className="font-semibold text-black dark:text-white">{page + 1}</span> of <span className="font-semibold text-black dark:text-white">{Math.ceil(beatmapsets.length / 10)}</span>
                        </span>
                        <Button
                            size="sm"
                            rounded="full"
                            onClick={() => setPage(prev => prev + 1)} disabled={!hasMore} className="px-3">
                            Next
                            <MdKeyboardArrowRight/>
                        </Button>
                    </div>
                )
            }
        </div>
    );
};

export default RequestList;
