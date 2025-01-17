'use client';

import React, {useEffect, useRef, useState} from 'react';
import {useBeatmapPreview} from "@/context/BeatmapPreviewContext";
import {MdClose, MdPause, MdPlayArrow, MdVolumeOff, MdVolumeUp} from "react-icons/md";
import {TimeUtils} from "@/utils/timeUtils";
import clsx from "clsx";

const BeatmapPreviewPlayer = () => {
    const [open, setOpen] = useState(false);

    const [volume, setVolume] = useState(0.5);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const {src, setSrc} = useBeatmapPreview();

    useEffect(() => {
        const storageVolume = localStorage.getItem('volume');

        setVolume(storageVolume ? parseFloat(storageVolume) : 0.5);
    }, []);

    useEffect(() => {
        localStorage.setItem('volume', volume.toString());

        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        if (src) {
            setOpen(true);

            setCurrentTime(0);
            setDuration(0);

            audioRef.current!.src = src;
        }
    }, [src]);

    const audioRef = useRef<HTMLAudioElement>(null);

    // TODO: Chrome styling for range inputs
    return (
        <div
            className={clsx(
                `bg-tertiary-100 m-4 dark:bg-tertiary-900 shadow p-4 rounded-xl fixed bottom-0 right-0 flex gap-4 items-center`,
                {"hidden": !src || !open}
                )}>
            <audio ref={audioRef}
                   onTimeUpdate={() => {
                       if (audioRef.current) {
                            setCurrentTime(audioRef.current.currentTime);
                            setDuration(audioRef.current.duration);
                       }
                   }}
                   onLoadedMetadata={() => {
                       if (audioRef.current) {
                           audioRef.current.volume = volume;

                           setCurrentTime(0);
                           setDuration(audioRef.current.duration);

                           audioRef.current.play();
                       }
                   }}
            />

            {
                audioRef.current && audioRef.current.paused && (
                    <button onClick={() => audioRef.current!.play()}>
                        <MdPlayArrow className="size-8"/>
                    </button>
                )
            }

            {
                audioRef.current && !audioRef.current.paused && (
                    <button onClick={() => audioRef.current!.pause()}>
                        <MdPause className="size-8"/>
                    </button>
                )
            }

            <div className="flex items-center gap-2">
                <div className="font-bold">
                    {TimeUtils.formatTime(Number(currentTime.toFixed()))}
                </div>
                <div className="text-tertiary-500">
                    {isNaN(duration) ? '00:00' : TimeUtils.formatTime(Number(duration.toFixed()))}
                </div>
            </div>

            <input type="range" min="0" max="1" step="0.01"
                   value={isNaN(currentTime / duration) ? 0 : currentTime / duration}
                   onChange={e => {
                       if (audioRef.current) audioRef.current.currentTime = parseFloat(e.target.value) * audioRef.current.duration;
                   }}
                   disabled={!src}
                   className={`w-64 ${!src ? 'opacity-50' : ''}`}
            />

            <div className="flex items-center gap-2">
                {
                    volume === 0 ? (
                        <MdVolumeOff className="size-6 cursor-pointer" onClick={
                            () => {
                                setVolume(0.1);
                            }
                        }/>
                    ) : (
                        <MdVolumeUp className="size-6 cursor-pointer" onClick={
                            () => {
                                setVolume(0);
                            }
                        }/>
                    )
                }
                <input type="range" min="0" max="1" step="0.01" value={volume}
                       className="w-24"
                       onChange={e => setVolume(parseFloat(e.target.value))}/>
            </div>

            <MdClose className="size-6 cursor-pointer" onClick={() => {
                setOpen(false);
                audioRef.current!.pause();
                setSrc(null);
            }}/>
        </div>

    );
};

export default BeatmapPreviewPlayer;
