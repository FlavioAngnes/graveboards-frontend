'use client';

import React, {FC, useEffect, useRef} from 'react';
import useBeatmapsets from "@/hooks/useBeatmapsets";
import Beatmapset from "@/components/beatmapsets/beatmapset";
import BeatmapsetPanelSkeleton from "@/components/beatmapsets/beatmapsetPanelSkeleton";
import {ViewSwitch} from "@/components/beatmapsets/controls/viewSwitch";
import SortingLayers from "@/components/beatmapsets/controls/sortingLayers";
import {useSorting} from "@/context/beatmapsets/SortingContext";
import clsx from "clsx";

interface BeatmapsetsProps {
    title: string;
    showControls: boolean;
}

type BeatmapsetListingView = 'list' | 'grid';

const Beatmapsets: FC<BeatmapsetsProps> = ({title, showControls}) => {
    /*const id = title?.toLowerCase().replace(' ', '-');*/

    const [view, setView] = React.useState<BeatmapsetListingView>('grid');
    const [page, setPage] = React.useState(0);

    const {layersToUse} = useSorting();

    useEffect(() => {
        setPage(0);
    }, [layersToUse]);

    const {beatmapsets, loading, error, hasMore} = useBeatmapsets(page);

    const observerRef = useRef<HTMLDivElement | null>(null);

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
                        <ViewSwitch view={view} setView={setView}/>
                        <div className="block h-6 w-[1px] bg-tertiary-200 dark:bg-tertiary-700"></div>
                        <div className="flex gap-2 relative">
                            {/*<Search value={search} onChange={setSearch} listId={id}/>*/}
                            {/*<Filters values={filters} onChange={setFilters}/>*/}
                            <SortingLayers/>
                        </div>
                    </div>
                )}
            </div>

            <div
                className={clsx(
                    'gap-4',
                    view === 'grid' ? `grid grid-cols-[repeat(auto-fill,_minmax(18rem,_1fr))]` : `flex flex-col`
                )}
            >
                {beatmapsets.map((beatmap) => (
                        <Beatmapset key={beatmap.id} beatmapset={beatmap} view={view}/>
                    )
                )}

                {(loading || hasMore) && (
                    <div ref={observerRef}>
                        <BeatmapsetPanelSkeleton view={view}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Beatmapsets;
