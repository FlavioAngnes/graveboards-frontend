'use client';

import React, {useEffect, useRef, useState} from 'react';
import BeatmapsetPanel from "@/app/ui/shared/beatmapsetPanel";
import {BeatmapsetListing} from "@/app/types/Beatmapset";
import BeatmapsetPanelSkeleton from "@/app/ui/shared/beatmapsetPanelSkeleton";

const getBeatmapsets = async (limit: number, offset: number) => {
    const res = await fetch(`http://localhost:8000/api/v1/beatmapsets/listings?limit=${limit}&offset=${offset}`);
    return res.json();
}

const BeatmapsetPanelList = () => {
    const [beatmapsets, setBeatmapsets] = useState<BeatmapsetListing[]>([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchBeatmapsets = async () => {
            const newBeatmapsets = await getBeatmapsets(10, offset);
            if (newBeatmapsets.length > 0) {
                return newBeatmapsets;
            } else {
                return null;
            }
        };

        fetchBeatmapsets().then(
            (newBeatmapsets) => {
                if (newBeatmapsets) {
                    setBeatmapsets((prevBeatmapsets) => [...prevBeatmapsets, ...newBeatmapsets]);
                } else {
                    setHasMore(false);
                }
            }
        );
    }, [offset]);

    useEffect(() => {
        if (!hasMore || !observerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setOffset((prevOffset) => prevOffset + 10);
                }
            },
            {threshold: 1.0}
        );

        observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [hasMore]);

    return (
        <>
            {beatmapsets.map((beatmap) => (
                <BeatmapsetPanel key={beatmap.id} beatmapset={beatmap}/>
            ))}
            {hasMore && <div ref={observerRef}><BeatmapsetPanelSkeleton/></div>}
        </>
    );
};

export default BeatmapsetPanelList;
