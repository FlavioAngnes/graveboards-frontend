'use client'

import {FC, useState} from "react";
import clsx from "clsx";
import {Beatmapset} from "@/types/beatmapsets/beatmapset";
import {MdPlayArrow, MdRadioButtonChecked} from "react-icons/md";
import {ColorUtils} from "@/utils/colorUtils";
import {TimeUtils} from "@/utils/timeUtils";
import Button from "@/components/shared/button";
import BeatmapsetStatusBadge from "@/components/beatmapsets/badge/beatmapsetStatusBadge";
import {useAuth} from "@/context/AuthContext";
import {useBeatmapPreview} from "@/context/BeatmapPreviewContext";

interface BeatmapsetProps {
    beatmapset: Beatmapset,
}

const BeatmapsetPanelGridView: FC<BeatmapsetProps> = ({beatmapset}) => {
    const [hover, setHover] = useState(false);

    const {isAdmin} = useAuth();

    const {setSrc} = useBeatmapPreview();

    return (
        <div className="flex flex-col items-start shrink-0 rounded-xl overflow-hidden self-stretch min-w-72 h-64">
            <div
                className={clsx("relative flex flex-col items-end p-2.5 justify-end gap-3 grow shrink-0 basis-0 self-stretch transition-[filter] duration-300 ease-in-out bg-center bg-no-repeat bg-[size:215%] tracking-[0.25px]", {"delay-300": hover})}
                style={{backgroundImage: `url(${beatmapset.beatmapset_snapshot.covers["cover@2x"]})`}}>
                <div className="flex gap-1.5 z-10">
                    <Button
                        onClick={() => {
                            setSrc(beatmapset.beatmapset_snapshot.preview_url);
                        }}
                        className={clsx(
                        "px-1.5 gap-1 h-8.5 font-semibold text-sm transition-[opacity, max-height] box-border duration-300 ease-in-out",
                        {"opacity-0": hover}
                    )}>
                        <MdPlayArrow className="size-4 shrink-0"/>
                        PREVIEW
                    </Button>
                    <div
                        className={clsx(
                            "bg-black bg-opacity-80 text-white rounded-lg p-1.5 leading-none text-sm overflow-hidden transition-[opacity, max-height] box-border duration-300 ease-in-out",
                            {"opacity-0": hover}
                        )}>
                        {TimeUtils.formatTime(beatmapset.beatmapset_snapshot.beatmap_snapshots[0].total_length)}
                    </div>
                </div>
                <div
                    className={clsx("absolute w-full h-full backdrop-blur backdrop-brightness-75 -mb-2.5 -mr-2.5 duration-300", {"opacity-0": !hover})}></div>
            </div>
            <div
                className="bg-tertiary-50 hover:bg-tertiary-100 hover:dark:bg-tertiary-800 dark:text-white dark:bg-tertiary-900 flex gap-3 p-2.5 self-stretch min-w-24 transition-colors duration-300 ease-in-out overflow-hidden relative tracking-wide">
                <a href={`https://osu.ppy.sh/users/${beatmapset.beatmapset_snapshot.user_id}`}
                   className="size-10 bg-gray-500 rounded-full bg-cover" target="_blank"
                   style={{backgroundImage: `url(${beatmapset.display_data.mapper_avatar})`}}></a>
                <div className="overflow-hidden flex-1 truncate">
                    <a href={`https://osu.ppy.sh/beatmapsets/${beatmapset.beatmapset_snapshot.beatmapset_id}`}
                       className="text-sm font-semibold leading-5" target="_blank">
                        {beatmapset.beatmapset_snapshot.title}
                    </a>
                    <div className="text-xs text-tertiary-500 dark:text-tertiary-400 truncate">
                        by {beatmapset.beatmapset_snapshot.artist}
                    </div>
                    <div className="text-xs text-tertiary-500 dark:text-tertiary-400">
                        Mapped by <a href={`https://osu.ppy.sh/users/${beatmapset.beatmapset_snapshot.user_id}`}
                                     className="font-semibold" target="_blank">{beatmapset.beatmapset_snapshot.creator}</a>
                    </div>
                    <div onMouseEnter={() => setHover(true)}
                         onMouseLeave={() => setHover(false)}
                         className="flex flex-col mt-2 gap-0 transition-[gap] duration-300 delay-300 ease-out group hover:gap-2 hover:delay-0">
                        <div className="flex items-center gap-1 self-stretch">
                            {
                                isAdmin && (
                                    <div className="flex items-center justify-center">
                                        <BeatmapsetStatusBadge status={beatmapset.beatmapset_snapshot.verified ? "verified" : "unverified"}/>
                                    </div>
                                )
                            }
                            <MdRadioButtonChecked className="size-4 shrink-0 text-tertiary-500 dark:text-tertiary-400"/>
                            <div className="flex items-center gap-0.5">
                                {
                                    beatmapset.beatmapset_snapshot.beatmap_snapshots
                                        .sort((a, b) => a.difficulty_rating - b.difficulty_rating)
                                        .slice(0, 14)
                                        .map((beatmap, index) => (
                                            <div key={index} className="w-1.5 h-4 bg-gray-500 rounded-full"
                                                 style={{backgroundColor: ColorUtils.forStarRating(beatmap.difficulty_rating)}}></div>
                                        ))
                                }

                                {beatmapset.beatmapset_snapshot.beatmap_snapshots.length > 14 && (
                                    <div className="text-xs ml-1 text-tertiary-500 dark:text-tertiary-400">
                                        +{beatmapset.beatmapset_snapshot.beatmap_snapshots.length - 14}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div
                            className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-hover:grid-rows-[1fr] grid-hover:delay-300">
                            <div className="overflow-hidden grid-rows-[1fr]">
                                <div className="flex flex-col gap-1 text-xs overflow-y-scroll snap-y max-h-24">
                                    {
                                        beatmapset.beatmapset_snapshot.beatmap_snapshots
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BeatmapsetPanelGridView;
