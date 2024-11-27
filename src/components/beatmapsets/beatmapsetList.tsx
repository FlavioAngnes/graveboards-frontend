'use client';

import React, {FC, useEffect, useRef, useState} from 'react';
import BeatmapsetPanel from "@/components/beatmapsets/beatmapsetPanel";
import {BeatmapsetListing} from "@/types/Beatmapset";
import BeatmapsetPanelSkeleton from "@/components/beatmapsets/beatmapsetPanelSkeleton";
import {MdClose, MdFilterList, MdGridView, MdImportExport, MdOutlineViewAgenda, MdSearch} from "react-icons/md";
import {BeatmapsetListingFilters} from "@/types/Filters";
import {BeatmapsetListingSorting, BeatmapsetListingSortingOptions} from "@/types/Sorting";

interface BeatmapsetListProps {
    title?: string;
    defaultFilters?: BeatmapsetListingFilters;
    defaultSorting?: BeatmapsetListingSorting[];
    queueId?: number;
}

type BeatmapsetListingView = 'list' | 'grid';

const BeatmapsetList: FC<BeatmapsetListProps> = ({title, defaultFilters, defaultSorting, queueId}) => {
    const [beatmapsets, setBeatmapsets] = useState<BeatmapsetListing[]>([]);

    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [view, setView] = useState<BeatmapsetListingView>('grid');

    const [filters, setFilters] = useState<BeatmapsetListingFilters>({});
    const [sortings, setSortings] = useState<BeatmapsetListingSorting[]>([]);
    const [search, setSearch] = useState<string>('');

    const [searchOpen, setSearchOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);

    const observerRef = useRef<HTMLDivElement | null>(null);

    const listId = title?.toLowerCase().replace(' ', '-');

    useEffect(() => {
        const fetchBeatmapsets = async (offset: number, search: string, filters: BeatmapsetListingFilters = {}, sortings: BeatmapsetListingSorting[] = [], limit: number = 10) => {
            const searchParams = new URLSearchParams();

            // Add filters to search params
            if (defaultFilters) {
                filters = {...defaultFilters, ...filters};
            }

            for (const [key, value] of Object.entries(filters)) {
                searchParams.append(key, JSON.stringify(value));
            }

            if (defaultSorting) {
                sortings = [...defaultSorting, ...sortings];
            }

            // Add sorting to search params
            const sorting: BeatmapsetListingSortingOptions[] = [];
            const sort_orders: string[] = [];

            for (const s of sortings) {
                sorting.push(s.value);
                sort_orders.push(s.order);
            }

            if (sorting.length > 0 && sort_orders.length > 0) {
                searchParams.append('sorting', JSON.stringify(sorting));
                searchParams.append('sort_order', JSON.stringify(sort_orders));
            }

            // Add search to search params
            if (search.length > 0) {
                searchParams.append('search_query', search);
            }

            // Add limit and offset to search params
            searchParams.append('limit', limit.toString());
            searchParams.append('offset', offset.toString());

            console.log(searchParams.toString());

            const response = await fetch(`/api/beatmapsets/listings?${searchParams}`, {
                cache: 'no-store',
            });

            if (!response.ok) {
                console.error('Failed to fetch beatmapsets');
                return null;
            }

            return await response.json() as BeatmapsetListing[];
        }

        setIsLoading(true);
        fetchBeatmapsets(offset, search, filters, sortings).then(
            (newBeatmapsets) => {
                if (newBeatmapsets) {
                    setBeatmapsets((prevBeatmapsets) => {
                        if (offset === 0) {
                            return newBeatmapsets;
                        } else {
                            const beatmapsets = [...prevBeatmapsets, ...newBeatmapsets];

                            return beatmapsets.filter((beatmapset, index, self) => self.findIndex((b) => b.id === beatmapset.id) === index);
                        }
                    });

                    setHasMore(newBeatmapsets.length > 0);
                } else {
                    setIsLoading(false);
                }
            }
        );
    }, [offset, filters, sortings, search, defaultFilters, defaultSorting, queueId]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    setOffset((prev) => prev + 10);
                }
            },
            {threshold: 1.0}
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }
    }, [hasMore, isLoading]);

    return (
        <div className="flex flex-col gap-4">
            <div
                className="flex flex-col lg:flex-row justify-between gap-2">
                <div className={`text-2xl font-semibold truncate transition-all duration-300 ease-in-out`}>{title}</div>
                <div className="flex items-center self-end gap-4 max-w-full">
                    <div className="block sm:hidden">
                        <button
                            onClick={() => view === 'grid' ? setView('list') : setView('grid')}
                            className={`p-1 rounded-lg hover:bg-tertiary-100 active:bg-tertiary-200 hover:dark:bg-tertiary-900 active:dark:bg-tertiary-800 flex sm:hidden items-center border-2 text-primary-500 border-primary-500 justify-center transition-colors duration-300 ease-in-out`}>
                            <MdGridView className={`size-5 ${view === 'grid' ? 'block' : 'hidden'}`}/>
                            <MdOutlineViewAgenda className={`size-5 ${view === 'list' ? 'block' : 'hidden'}`}/>
                        </button>
                    </div>
                    <div className="hidden sm:flex gap-2">
                        <button
                            onClick={() => setView('list')}
                            className={`p-1 rounded-lg hover:bg-tertiary-100 active:bg-tertiary-200 hover:dark:bg-tertiary-900 active:dark:bg-tertiary-800 flex items-center border-2 justify-center transition-colors duration-300 ease-in-out
                            ${view === 'list' ? `text-primary-500 border-primary-500` : `text-tertiary-500 border-transparent hover:dark:border-tertiary-900 active:dark:border-tertiary-800`}`}>
                            <MdOutlineViewAgenda className="size-5"/>
                        </button>
                        <button
                            onClick={() => setView('grid')}
                            className={`p-1 rounded-lg hover:bg-tertiary-100 active:bg-tertiary-200 hover:dark:bg-tertiary-900 active:dark:bg-tertiary-800 flex items-center border-2 justify-center transition-colors duration-300 ease-in-out
                            ${view === 'grid' ? `text-primary-500 border-primary-500` : `text-tertiary-500 border-transparent hover:dark:border-tertiary-900 active:dark:border-tertiary-800`}`}>
                            <MdGridView className="size-5"/>
                        </button>
                    </div>

                    <div className="block h-6 w-[1px] bg-tertiary-200 dark:bg-tertiary-700"></div>

                    <div className="flex gap-2">
                        <div
                            className={`${search.length > 0 ? 'border-primary-500' : 'border-transparent'} ${searchOpen ? 'bg-tertiary-100 dark:bg-tertiary-900' : ''} flex border-2 items-center rounded-lg transition-all duration-300 ease-in-out`}>
                            <button onClick={() => {
                                setSearchOpen(!searchOpen)
                                if (!searchOpen) {
                                    const input = document.getElementById(`${listId}-search`);

                                    if (input) {
                                        input.focus();
                                    }
                                }
                            }}
                                    className={`p-1 rounded-lg hover:bg-tertiary-100 active:bg-tertiary-200 hover:dark:bg-tertiary-900 active:dark:bg-tertiary-800 flex items-center justify-center transition-all duration-300 ease-in-out box-border border-2 border-transparent
                            ${search.length > 0 ? `text-primary-500` : `text-tertiary-500 hover:dark:border-tertiary-900 active:dark:border-tertiary-800`}`}>
                                <MdSearch className="size-5"/>
                            </button>
                            <input id={`${listId}-search`}
                                   className={`bg-transparent outline-none ring-none ${searchOpen ? 'opacity-100 max-[400px]:w-24 max-w-32 sm:max-w-40' : 'opacity-0 max-w-0'} transition-all duration-300 ease-in-out`}
                                   type="text" value={search} onChange={(e) => {
                                setSearch(e.target.value)
                                setOffset(0);
                            }}/>
                            <button onClick={() => {
                                setSearch('');
                                setOffset(0);
                            }} disabled={search.length === 0}
                                    className={`rounded-lg enabled:hover:bg-tertiary-100 enabled:active:bg-tertiary-200 enabled:hover:dark:bg-tertiary-900 enabled:active:dark:bg-tertiary-800 flex items-center justify-center transition-all duration-300 ease-in-out
                                ${searchOpen ? 'p-1 w-6' : 'p-0 w-0'}
                                ${search.length > 0 ? `text-primary-500 opacity-100` : `opacity-0 hover:dark:border-tertiary-900 active:dark:border-tertiary-800`}`}>
                                <MdClose className="size-5"/>
                            </button>
                        </div>

                        <button onClick={() => setFilterOpen(!filterOpen)}
                                className={`p-1 size-9 rounded-lg hover:bg-tertiary-100 active:bg-tertiary-200 hover:dark:bg-tertiary-900 active:dark:bg-tertiary-800 flex items-center border-2 justify-center transition-colors duration-300 ease-in-out
                            ${filters.request_filter || filters.beatmapset_filter || filters.mapper_filter || filters.beatmapset_filter ? `text-primary-500 border-primary-500` : `text-tertiary-500 border-transparent hover:dark:border-tertiary-900 active:dark:border-tertiary-800`}`}>
                            <MdFilterList className="size-5"/>
                        </button>
                        <button onClick={() => setSortOpen(!sortOpen)}
                                className={`p-1 size-9 rounded-lg hover:bg-tertiary-100 active:bg-tertiary-200 hover:dark:bg-tertiary-900 active:dark:bg-tertiary-800 flex items-center border-2 justify-center transition-colors duration-300 ease-in-out
                            ${sortings.length > 0 ? `text-primary-500 border-primary-500` : `text-tertiary-500 border-transparent hover:dark:border-tertiary-900 active:dark:border-tertiary-800`}`}>
                            <MdImportExport className="size-5"/>
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={`${view === 'grid' ? `grid grid-cols-[repeat(auto-fill,_minmax(18rem,_1fr))]` : `flex flex-col`} gap-4 w-full`}>
                {beatmapsets.map((beatmap) => (
                    <BeatmapsetPanel key={beatmap.id} beatmapset={beatmap} view={view}/>
                ))}
                {hasMore && <div ref={observerRef}><BeatmapsetPanelSkeleton view={view}/></div>}
            </div>
        </div>
    );
};

export default BeatmapsetList;
