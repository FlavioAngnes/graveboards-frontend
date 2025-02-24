"use client";

import { FC, useState } from "react";
import clsx from "clsx";
import { BeatmapsetRequest } from "@/types/requests/request";
import { MdPlayArrow, MdRadioButtonChecked } from "react-icons/md";
import { ColorUtils } from "@/utils/colorUtils";
import { TimeUtils } from "@/utils/timeUtils";
import Button from "@/components/shared/button";
import RequestStatusBadge from "@/components/requests/badge/requestStatusBadge";
import { useBeatmapPreview } from "@/context/BeatmapPreviewContext";
import Link from "next/link";

interface RequestPanelProps {
    request: BeatmapsetRequest,
    showQueue?: boolean;
}

const RequestPanelGridView: FC<RequestPanelProps> = ({request, showQueue = true}) => {
    const [hover, setHover] = useState(false);

    const {setSrc} = useBeatmapPreview();

    return (
        <div className="flex flex-col items-start shrink-0 rounded-xl overflow-hidden self-stretch min-w-72 h-[17.5rem]">
            <div
                className={clsx(
                    "relative flex flex-col items-end p-2.5 justify-end gap-3 grow shrink-0 basis-0 self-stretch transition-[filter] duration-300 ease-in-out bg-center bg-no-repeat bg-[size:215%] tracking-[0.25px]",
                    {"delay-300": hover}
                )}
                style={{backgroundImage: `url(${request.beatmapset_snapshot.covers["cover@2x"]})`}}>
                <div className="flex gap-1.5 z-10">
                    <Button className={clsx(
                        "px-1.5 gap-1 h-8.5 font-semibold text-sm transition-[opacity, max-height] box-border duration-300 ease-in-out",
                        {"opacity-0": hover}
                    )}
                            onClick={() => {
                                setSrc(request.beatmapset_snapshot.preview_url);
                            }}>

                        <MdPlayArrow className="size-4 shrink-0"/>
                        PREVIEW
                    </Button>
                    <div
                        className={clsx(
                            "bg-black bg-opacity-80 text-white rounded-lg p-1.5 leading-none text-sm overflow-hidden transition-[opacity, max-height] box-border duration-300 ease-in-out",
                            {"opacity-0": hover}
                        )}>
                        {TimeUtils.formatTime(request.beatmapset_snapshot.beatmap_snapshots[0].total_length)}
                    </div>
                </div>
                <div
                    className={clsx("absolute w-full h-full backdrop-blur backdrop-brightness-75 -mb-2.5 -mr-2.5 duration-300", {"opacity-0": !hover})}></div>
            </div>
            <div
                className={clsx(`bg-tertiary-50 hover:bg-tertiary-100 hover:dark:bg-tertiary-800 dark:text-white dark:bg-tertiary-900 flex gap-3 p-2.5 self-stretch min-w-24 transition-colors duration-300 ease-in-out overflow-hidden relative tracking-wide`, {"rounded-b-xl": showQueue})}>
                <a href={`https://osu.ppy.sh/users/${request.beatmapset_snapshot.user_profile.user_id}`}
                   className="size-10 bg-gray-500 rounded-full bg-cover" target="_blank"
                   style={{backgroundImage: `url(${request.beatmapset_snapshot.user_profile.avatar_url})`}}></a>
                <div className="overflow-hidden flex-1 truncate">
                    <a href={`https://osu.ppy.sh/beatmapsets/${request.beatmapset_id}`}
                       className="text-sm font-semibold leading-5" target="_blank">
                        {request.beatmapset_snapshot.title}
                    </a>
                    <div className="text-xs text-tertiary-500 dark:text-tertiary-400 truncate">
                        by {request.beatmapset_snapshot.artist}
                    </div>
                    <div className="text-xs text-tertiary-500 dark:text-tertiary-400">
                        Mapped by <a href={`https://osu.ppy.sh/users/${request.beatmapset_snapshot.user_id}`}
                                     className="font-semibold" target="_blank">{request.beatmapset_snapshot.user_profile.username}</a>
                    </div>
                    <div onMouseEnter={() => setHover(true)}
                         onMouseLeave={() => setHover(false)}
                         className="flex flex-col mt-2 gap-0 transition-[gap] duration-300 delay-300 ease-out group hover:gap-2 hover:delay-0">
                        <div className="flex items-center gap-1 self-stretch">
                            <div className="flex items-center justify-center">
                                <RequestStatusBadge status={request.status}/>
                            </div>

                            <MdRadioButtonChecked className="size-4 shrink-0 text-tertiary-500 dark:text-tertiary-400"/>

                            <div className="flex items-center gap-0.5">
                                {
                                    request.beatmapset_snapshot.beatmap_snapshots
                                        .sort((a, b) => a.difficulty_rating - b.difficulty_rating)
                                        .slice(0, 14)
                                        .map((beatmap, index) => (
                                            <div key={index} className="w-1.5 h-4 bg-gray-500 rounded-full"
                                                 style={{backgroundColor: ColorUtils.forStarRating(beatmap.difficulty_rating)}}></div>
                                        ))
                                }

                                {request.beatmapset_snapshot.beatmap_snapshots.length > 14 && (
                                    <div className="text-xs ml-1 text-tertiary-500 dark:text-tertiary-400">
                                        +{request.beatmapset_snapshot.beatmap_snapshots.length - 14}
                                    </div>
                                )}
                            </div>
                        </div>

                        {<div
                            className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-hover:grid-rows-[1fr] grid-hover:delay-300">
                            <div className="overflow-hidden grid-rows-[1fr]">
                                <div className="flex flex-col gap-1 text-xs overflow-y-scroll snap-y max-h-24">
                                    {
                                        request.beatmapset_snapshot.beatmap_snapshots
                                            .sort((a, b) => b.difficulty_rating - a.difficulty_rating)
                                            .map((beatmap, index) => (

                                                <div key={index}
                                                     className="snap-start flex items-center gap-1 flex-1 shrink-0 overflow-x-hidden">
                                                    <MdRadioButtonChecked
                                                        className="size-4 shrink-0 text-tertiary-500 dark:text-tertiary-400"/>
                                                    <div className="px-2 rounded-full font-semibold"
                                                         style={{
                                                             backgroundColor: ColorUtils.forStarRating(beatmap.difficulty_rating),
                                                             color: beatmap.difficulty_rating >= 6.5 ? "#fff" : "#000"
                                                         }}>
                                                        ★ {beatmap.difficulty_rating.toFixed(2)}
                                                    </div>
                                                    <div
                                                        className="truncate">
                                                        {beatmap.version}
                                                    </div>
                                                </div>
                                            ))
                                    }
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
            <Link
                href={`/queues/${request.queue.id}`}
                className="bg-tertiary-100 dark:bg-tertiary-800 w-full flex items-center justify-center text-tertiary-500 h-10 -mt-4 pt-4 text-sm">
                {request.queue.name}
            </Link>
        </div>
    );
}

export default RequestPanelGridView;
