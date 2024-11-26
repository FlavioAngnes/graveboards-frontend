'use client';

import React, {useEffect, useRef, useState} from 'react';
import BeatmapsetPanel from "@/components/beatmapsets/beatmapsetPanel";
import {BeatmapsetListing} from "@/types/Beatmapset";
import BeatmapsetPanelSkeleton from "@/components/beatmapsets/beatmapsetPanelSkeleton";


const BeatmapsetList = () => {
    const [beatmapsets, setBeatmapsets] = useState<BeatmapsetListing[]>([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchBeatmapsets = async (offset: number = 0, limit: number = 10) => {
            const response = await fetch(`/api/beatmapsets/listings?limit=${limit}&offset=${offset}`, {
                cache: 'no-store',
            });

            if (!response.ok) {
                console.error('Failed to fetch beatmapsets');
                return null;
            }

            return await response.json() as BeatmapsetListing[];
        }

        setIsLoading(true);
        fetchBeatmapsets(offset).then(
            (newBeatmapsets) => {
                if (newBeatmapsets) {
                    setBeatmapsets((prevBeatmapsets) => {
                        const newBeatmapsetsFiltered = newBeatmapsets.filter(
                            (newBeatmap) => !prevBeatmapsets.some((prevBeatmap) => prevBeatmap.id === newBeatmap.id)
                        );
                        return [...prevBeatmapsets, ...newBeatmapsetsFiltered];
                    });

                    setHasMore(newBeatmapsets.length > 0);
                } else {
                    setIsLoading(false);
                }
            }
        );
    }, [offset]);

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
        <>
            {beatmapsets.map((beatmap) => (
                <BeatmapsetPanel key={beatmap.id} beatmapset={beatmap}/>
            ))}
            {hasMore && <div ref={observerRef}><BeatmapsetPanelSkeleton/></div>}
        </>
    );
};

export default BeatmapsetList;
