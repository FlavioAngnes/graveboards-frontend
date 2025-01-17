'use client';

import React, {FC, useEffect, useRef} from 'react';
import useBeatmapsets from "@/hooks/useBeatmapsets";
import BeatmapsetPanel from "@/components/beatmapsets/panels/beatmapsetPanel";
import BeatmapsetPanelSkeleton from "@/components/beatmapsets/panels/beatmapsetPanelSkeleton";
import {useSorting} from "@/context/beatmapsets/BeatmapsetListSortingContext";
import clsx from "clsx";
import {useFilters} from "@/context/beatmapsets/BeatmapsetListFiltersContext";
import FilterChip from "@/components/shared/filterChip";
import {FilterOperators} from "@/types/filters";
import {BeatmapsetListFiltersMap} from "@/data/beatmapsets/filters";
import BeatmapsetGroup from "@/components/beatmapsets/beatmapsetGroup";
import {useSearch} from "@/context/beatmapsets/BeatmapsetListSearchContext";
import ListControls from "@/components/shared/lists/listControls";

interface BeatmapsetsProps {
    title: string;
    queueId?: number;
    showGrouping?: boolean;
    showViewSwitch?: boolean;
    showSearch?: boolean;
    showFilters?: boolean;
    showSorting?: boolean;
}

type View = 'list' | 'grid';

export type BeatmapsetListGroup = 'artist' | 'mapper' | null;

const BeatmapsetList: FC<BeatmapsetsProps> = ({
                                                  title,
                                                  queueId,
                                                  showGrouping = true,
                                                  showViewSwitch = true,
                                                  showSearch = true,
                                                  showSorting = true,
                                                  showFilters = true
                                              }) => {
    const showControls = showGrouping && showViewSwitch && showSearch && showFilters && showSorting;
    const id = title?.toLowerCase().replace(' ', '-');

    const [view, setView] = React.useState<View>('grid');
    const [page, setPage] = React.useState(0);
    const [grouping, setGrouping] = React.useState<BeatmapsetListGroup>(null);

    const {layersToUse} = useSorting();
    const {filters, filtersToUse} = useFilters();
    const {search} = useSearch();

    useEffect(() => {
        setPage(0);
    }, [layersToUse, filtersToUse, search]);

    const {beatmapsets, loading, error, hasMore} = useBeatmapsets(page, queueId);

    const observerRef = useRef<HTMLDivElement | null>(null);

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

    useEffect(() => {
        if (loading) return;

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
    }, [loading, hasMore]);

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

            {
                filters.length > 0 && (
                    <div className="flex gap-2">
                        {filters.map((filter, index) => (
                            Object.entries(filter.options).map(([key, value]) => (
                                <FilterChip name={filter.value} key={`${index}-${key}`}
                                            label={BeatmapsetListFiltersMap[filter.value].label} option={{
                                    operation: key as FilterOperators,
                                    value: value
                                }}/>
                            ))
                        ))}
                    </div>
                )
            }

            <div
                className={clsx(
                    'gap-4',
                    {'flex flex-col': grouping},
                    view === 'grid' && !grouping ? `grid grid-cols-[repeat(auto-fill,_minmax(18rem,_1fr))]` : `flex flex-col`
                )}
            >
                {
                    grouping ? (
                        Object.entries(groupedBeatmapsets).map(([artist, beatmaps]) => (
                            <BeatmapsetGroup title={artist} beatmapsets={beatmaps} view={view} key={artist}/>
                        ))
                    ) : (
                        beatmapsets.map((beatmap) => (
                                <BeatmapsetPanel key={beatmap.id} beatmapset={beatmap} view={view}/>
                            )
                        )
                    )
                }

                {(loading || hasMore) && (
                    <div ref={observerRef}>
                        <BeatmapsetPanelSkeleton view={view}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BeatmapsetList;
