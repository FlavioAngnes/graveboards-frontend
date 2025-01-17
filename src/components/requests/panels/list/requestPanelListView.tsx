'use client'

import React, {FC, useState} from "react";
import {BeatmapsetListing} from "@/types/beatmapsets/beatmapset";
import {MdChevronRight, MdComment, MdPlayArrow, MdRadioButtonChecked} from "react-icons/md";
import {ColorUtils} from "@/utils/colorUtils";
import RequestStatusBadge from "@/components/requests/badge/requestStatusBadge";
import Link from "next/link";
import SelectRequestStatus from "@/components/requests/manage/selectRequestStatus";
import SelectBeatmapsetStatus from "@/components/requests/manage/selectBeatmapsetStatus";
import clsx from "clsx";
import {useAuth} from "@/context/AuthContext";
import {TimeUtils} from "@/utils/timeUtils";
import Button from "@/components/shared/button";
import BeatmapsetStatusBadge from "@/components/beatmapsets/badge/beatmapsetStatusBadge";
import {useBeatmapPreview} from "@/context/BeatmapPreviewContext";

interface RequestPanelProps {
    // TODO: Replace with Request type
    beatmapset: BeatmapsetListing,
    editMode?: boolean;
}

const RequestPanelListView: FC<RequestPanelProps> = ({beatmapset, editMode = false}) => {
    const {isAdmin} = useAuth();
    const {setSrc} = useBeatmapPreview();

    const [commentOpen, setCommentOpen] = useState(false);

    return (
        <div className="flex rounded-xl h-24">
            <div
                className="flex-col p-2.5 justify-end gap-3 items-end hidden xl:flex rounded-l-xl h-full aspect-video bg-center bg-no-repeat bg-[size:215%]"
                style={{backgroundImage: `url(${beatmapset.beatmapset_snapshot.covers["cover@2x"]})`}}>
                <div className="flex gap-1.5">
                    <Button className="px-1.5 gap-1 h-8.5 font-semibold text-sm"
                            onClick={() => {
                        setSrc(beatmapset.beatmapset_snapshot.preview_url);
                    }}>
                        <MdPlayArrow className="size-4 shrink-0"/>
                        PREVIEW
                    </Button>
                    <div
                        className="bg-black bg-opacity-80 text-white rounded-lg p-1.5 leading-none text-sm overflow-hidden max-h-7 box-border">
                        {TimeUtils.formatTime(beatmapset.beatmapset_snapshot.beatmap_snapshots[0].total_length)}
                    </div>
                </div>
            </div>
            <div
                className={clsx(
                    `bg-tertiary-50 dark:text-white dark:bg-tertiary-900 grid w-full items-center gap-4 px-4 relative tracking-wide rounded-xl xl:rounded-l-none xl:rounded-r-xl`,
                    isAdmin ?
                        'lg:grid-cols-[repeat(3,minmax(0,1fr)),1.5rem,repeat(2,minmax(0,1fr))] sm:grid-cols-[repeat(2,minmax(0,1fr)),1.5rem,repeat(2,minmax(0,1fr))] grid-cols-3' :
                        'lg:grid-cols-[repeat(3,minmax(0,1fr)),1.5rem,repeat(1,minmax(0,1fr))] sm:grid-cols-[repeat(2,minmax(0,1fr)),1.5rem,repeat(1,minmax(0,1fr))] grid-cols-2'
                )}>
                <div className="truncate">
                    <a href={`https://osu.ppy.sh/beatmapsets/${beatmapset.beatmapset_snapshot.beatmapset_id}`}
                       className="text-sm font-semibold leading-5 truncate" target="_blank">
                        {beatmapset.beatmapset_snapshot.title}
                    </a>

                    <div className="text-xs text-tertiary-500 dark:text-tertiary-400 truncate">
                        by {beatmapset.beatmapset_snapshot.artist}
                    </div>

                    {/*TODO: Replace with requestor data*/}
                    <div className="text-xs text-tertiary-500 dark:text-tertiary-400 truncate">
                        Requested by <a href={`https://osu.ppy.sh/users/${beatmapset.beatmapset_snapshot.user_id}`}
                                        className="font-semibold"
                                        target="_blank">{beatmapset.beatmapset_snapshot.creator}</a>
                    </div>

                    <div className="block lg:hidden text-xs text-tertiary-500 dark:text-tertiary-400 truncate">
                        Mapped by <a href={`https://osu.ppy.sh/users/${beatmapset.beatmapset_snapshot.user_id}`}
                                     className="font-semibold"
                                     target="_blank">{beatmapset.beatmapset_snapshot.creator}</a>
                    </div>
                </div>

                <div className="hidden lg:flex items-center gap-2 truncate">
                    <a href={`https://osu.ppy.sh/users/${beatmapset.beatmapset_snapshot.user_id}`}
                       className="size-10 shrink-0 bg-gray-500 rounded-full bg-cover" target="_blank"
                       style={{backgroundImage: `url(${beatmapset.display_data.mapper_avatar})`}}></a>
                    <div className="flex flex-col">
                        <div className="text-xs text-tertiary-500 dark:text-tertiary-400">
                            Mapped by
                        </div>
                        <a href={`https://osu.ppy.sh/users/${beatmapset.beatmapset_snapshot.user_id}`}
                           className="text-sm font-semibold"
                           target="_blank">{beatmapset.beatmapset_snapshot.creator}</a>
                    </div>
                </div>

                <div
                    className="hidden sm:flex flex-col gap-0 transition-[gap] duration-300 delay-300 ease-out group hover:gap-2 hover:delay-0">
                    <div className="flex items-center gap-1 self-stretch">
                        <MdRadioButtonChecked className="size-4 shrink-0 text-tertiary-500 dark:text-tertiary-400"/>
                        <div className="flex items-center gap-0.5">
                            {
                                beatmapset.beatmapset_snapshot.beatmap_snapshots
                                    .sort((a, b) => a.difficulty_rating - b.difficulty_rating)
                                    .slice(0, 6)
                                    .map((beatmap, index) => (
                                        <div key={index} className="w-1.5 h-4 bg-gray-500 rounded-full"
                                             style={{backgroundColor: ColorUtils.forStarRating(beatmap.difficulty_rating)}}></div>
                                    ))
                            }

                            {beatmapset.beatmapset_snapshot.beatmap_snapshots.length > 6 && (
                                <div className="text-xs ml-1 text-tertiary-500 dark:text-tertiary-400">
                                    +{beatmapset.beatmapset_snapshot.beatmap_snapshots.length - 6}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="text-tertiary-500 font-semibold gap-1 items-center hidden sm:flex">
                    <MdComment
                        className="size-6 shrink-0"
                        onMouseEnter={() => setCommentOpen(true)}
                        onMouseLeave={() => setCommentOpen(false)}
                    />
                    {commentOpen && (
                        <div className="relative">
                            <div
                                className="absolute z-10 w-64 p-2 bg-white border rounded-lg text-tertiary-500 dark:text-tertiary-400 dark:bg-tertiary-800 dark:border-tertiary-700 right-0 top-full mt-4"
                            >
                                This is a comment
                            </div>
                        </div>
                    )}
                </div>

                {
                    editMode ? (
                        <>
                            {
                                isAdmin && (
                                    <div className="flex items-center justify-center">
                                        <SelectBeatmapsetStatus
                                            initialStatus={beatmapset.beatmapset_snapshot.verified ? "verified" : "unverified"}/>
                                    </div>
                                )
                            }

                            <div className="flex items-center justify-center">
                                <SelectRequestStatus initialStatus={"pending"}/>
                            </div>
                        </>
                    ) : (
                        <>
                            {
                                isAdmin && (
                                    <div className="flex items-center justify-center">
                                        <BeatmapsetStatusBadge
                                            status={beatmapset.beatmapset_snapshot.verified ? "verified" : "unverified"}/>
                                    </div>
                                )
                            }

                            <div className="flex items-center justify-center">
                                <RequestStatusBadge status={"accepted"}/>
                            </div>
                        </>
                    )
                }
            </div>

            <Link
                href={`/requests/1`}
                className={`h-full flex items-center justify-center rounded-r-xl bg-tertiary-100 hover:bg-tertiary-200 active:bg-tertiary-300 dark:bg-tertiary-800 hover:dark:bg-tertiary-700 active:dark:bg-tertiary-600 pl-8 -ml-8 hover:w-20 w-14 transition-all duration-150 ease-in-out`}>
                <MdChevronRight className="size-6 shrink-0 text-tertiary-500 justify-self-end"/>
            </Link>
        </div>
    );
}

export default RequestPanelListView;
