'use client';

import React, {FC, useEffect, useRef} from 'react';
import useRequests from "@/hooks/useRequests";
import {useSorting} from "@/context/beatmapsets/SortingContext";
import clsx from "clsx";
import {useFilters} from "@/context/beatmapsets/FiltersContext";
import {useSearch} from "@/context/beatmapsets/SearchContext";
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

export type GroupKey = 'artist' | 'mapper' | null;

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

    const {requests, isLoading, error, hasMore} = useRequests(page, queueId);

    const {search} = useSearch();
    const {filtersToUse} = useFilters();
    const {layersToUse} = useSorting();

    //#endregion

    //#region Beatmapset Grouping

    const [grouping, setGrouping] = React.useState<GroupKey>(null);

    const groupedRequests = requests.reduce((groups, request) => {
        if (!grouping) {
            return groups;
        }

        const groupKey = ({
            'artist': request.beatmapset_snapshot.artist,
            'mapper': request.beatmapset_snapshot.creator,
        })[grouping];

        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }

        groups[groupKey].push(request);

        return groups;
    }, {} as Record<string, typeof requests>);

    //#endregion

    //#region Infinite scroll

    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isLoading || pagination) return;

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
    }, [isLoading, hasMore, pagination]);

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
                    `gap-4`,
                    view === 'grid' && !grouping ? `grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))]` : `flex flex-col`
                )}
            >
                {
                    grouping ? (
                        Object.entries(groupedRequests).map(([key, requests]) => (
                            <RequestGroup title={key} requests={requests} view={view} key={key} editMode={editMode}/>
                        ))
                    ) : (
                        pagination ? (
                            requests.slice(page * 10, (page + 1) * 10).map((request) => (
                                <RequestPanel key={request.id} requests={request} view={view}
                                              editMode={editMode}/>
                            ))
                        ) : (
                            requests.map((request) => (
                                <RequestPanel key={request.id} requests={request} view={view}
                                              editMode={editMode}/>
                            ))
                        )
                    )

                }

                {(isLoading || hasMore) && (
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
                            Page <span className="font-semibold text-black dark:text-white">{page + 1}</span> of <span className="font-semibold text-black dark:text-white">{Math.ceil(requests.length / 10)}</span>
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
