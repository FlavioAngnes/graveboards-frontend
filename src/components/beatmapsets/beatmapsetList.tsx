'use client';

import React, {FC, useEffect, useRef} from 'react';
import useBeatmapsets from "@/hooks/useBeatmapsets";
import BeatmapsetPanel from "@/components/beatmapsets/beatmapsetPanel";
import BeatmapsetPanelSkeleton from "@/components/beatmapsets/beatmapsetPanelSkeleton";
import {ViewSwitch} from "@/components/beatmapsets/controls/viewSwitch";
import SortingLayers from "@/components/beatmapsets/controls/sortingLayers/sortingLayers";
import {useSorting} from "@/context/beatmapsets/BeatmapsetListSortingContext";
import clsx from "clsx";
import Filters from "@/components/beatmapsets/controls/filters/filters";
import {useFilters} from "@/context/beatmapsets/BeatmapsetListFiltersContext";
import FilterChip from "@/components/shared/filterChip";
import {FilterOperators} from "@/types/filters";
import {BeatmapsetListFiltersMap} from "@/data/beatmapsets/filters";
import Grouping from "@/components/beatmapsets/controls/grouping";
import BeatmapsetGroup from "@/components/beatmapsets/beatmapsetGroup";

interface BeatmapsetsProps {
    title: string;
    showControls: boolean;
}

type View = 'list' | 'grid';

export type BeatmapsetListGroup = 'artist' | 'mapper' | null;

const BeatmapsetList: FC<BeatmapsetsProps> = ({title, showControls}) => {
    /*const id = title?.toLowerCase().replace(' ', '-');*/

    const [view, setView] = React.useState<View>('grid');
    const [page, setPage] = React.useState(0);
    const [grouping, setGrouping] = React.useState<BeatmapsetListGroup>(null);

    const {layersToUse} = useSorting();

    useEffect(() => {
        setPage(0);
    }, [layersToUse]);

    const {beatmapsets, loading, error, hasMore} = useBeatmapsets(page);
    const {filters} = useFilters();

    const observerRef = useRef<HTMLDivElement | null>(null);

    const groupedBeatmapsets = beatmapsets.reduce((groups, beatmap) => {
        if (!grouping) {
            return groups;
        }

        const groupKey = (beatmap.display_data as never)[grouping];
        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }
        groups[groupKey].push(beatmap);
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
        <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row justify-between gap-2">
                <div className="text-2xl font-semibold truncate transition-all duration-300 ease-in-out">
                    {title}
                </div>

                {showControls && (
                    <div className="flex items-center self-end gap-4 max-w-full">
                        <Grouping grouping={grouping} setGrouping={setGrouping}/>
                        <div className="block h-6 w-[1px] bg-tertiary-200 dark:bg-tertiary-700"></div>
                        <ViewSwitch view={view} setView={setView}/>
                        <div className="block h-6 w-[1px] bg-tertiary-200 dark:bg-tertiary-700"></div>
                        <div className="flex gap-2 relative">
                            {/*<Search value={search} onChange={setSearch} listId={id}/>*/}
                            <Filters/>
                            <SortingLayers/>
                        </div>
                    </div>
                )}
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
