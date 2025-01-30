"use client";

import React, { FC, useActionState, useState } from "react";
import { BeatmapsetRequest, RequestStatus } from "@/types/requests/request";
import { MdChevronRight, MdComment, MdPlayArrow, MdRadioButtonChecked } from "react-icons/md";
import { ColorUtils } from "@/utils/colorUtils";
import RequestStatusBadge from "@/components/requests/badge/requestStatusBadge";
import SelectRequestStatus from "@/components/requests/manage/selectRequestStatus";
import clsx from "clsx";
import { useAuth } from "@/context/AuthContext";
import { TimeUtils } from "@/utils/timeUtils";
import Button from "@/components/shared/button";
import { useBeatmapPreview } from "@/context/BeatmapPreviewContext";
import { patchRequest } from "@/actions/requests";
import SelectBeatmapsetStatus from "@/components/requests/manage/selectBeatmapsetStatus";
import BeatmapsetStatusBadge from "@/components/beatmapsets/badge/beatmapsetStatusBadge";
import Link from "next/link";
import toast from "react-hot-toast";

interface RequestPanelProps {
    request: BeatmapsetRequest,
    editMode?: boolean;
}

const RequestPanelListView: FC<RequestPanelProps> = ({ request, editMode = false }) => {
    const { isAdmin } = useAuth();
    const { setSrc } = useBeatmapPreview();

    const [commentOpen, setCommentOpen] = useState(false);

    const formRef = React.useRef<HTMLFormElement>(null);

    const [selectRequestStatusState, dispatchSelectRequestStatus, isSelectRequestStatusPending] = useActionState(async (prevState: { status: RequestStatus }, formData: FormData) => {
        const newStatus = Number(formData.get("status")) as RequestStatus;

        const result = await patchRequest(request.id, { status: newStatus });

        if (result) {
            toast.success("Request status updated");
            return { status: newStatus };
        } else {
            toast.error("Failed to update request status");
            return prevState;
        }
    }, { status: request.status });

    return (
        <div className="flex rounded-xl h-24">
            <div
                className="flex-col p-2.5 justify-end gap-3 items-end hidden xl:flex rounded-l-xl h-full aspect-video bg-center bg-no-repeat bg-[size:215%]"
                style={{ backgroundImage: `url(${request.beatmapset_snapshot.covers["cover@2x"]})` }}>
                <div className="flex gap-1.5">
                    <Button className="px-1.5 gap-1 h-8.5 font-semibold text-sm"
                            onClick={() => setSrc(request.beatmapset_snapshot.preview_url)}>
                        <MdPlayArrow className="size-4 shrink-0" />
                        PREVIEW
                    </Button>
                    <div
                        className="bg-black bg-opacity-80 text-white rounded-lg p-1.5 leading-none text-sm overflow-hidden max-h-7 box-border">
                        {TimeUtils.formatTime(request.beatmapset_snapshot.beatmap_snapshots[0].total_length)}
                    </div>
                </div>
            </div>
            <div
                className={clsx(
                    `bg-tertiary-50 dark:text-white dark:bg-tertiary-900 grid w-full items-center gap-4 px-4 relative tracking-wide rounded-xl xl:rounded-l-none xl:rounded-r-xl`,
                    isAdmin ?
                        "lg:grid-cols-[repeat(3,minmax(0,1fr)),1.5rem,repeat(2,minmax(0,1fr))] sm:grid-cols-[repeat(2,minmax(0,1fr)),1.5rem,repeat(2,minmax(0,1fr))] grid-cols-3" :
                        "lg:grid-cols-[repeat(3,minmax(0,1fr)),1.5rem,repeat(1,minmax(0,1fr))] sm:grid-cols-[repeat(2,minmax(0,1fr)),1.5rem,repeat(1,minmax(0,1fr))] grid-cols-2"
                )}>
                <div className="truncate">
                    <a href={`https://osu.ppy.sh/beatmapsets/${request.beatmapset_id}`}
                       className="text-sm font-semibold leading-5 truncate" target="_blank">
                        {request.beatmapset_snapshot.title}
                    </a>

                    <div className="text-xs text-tertiary-500 dark:text-tertiary-400 truncate">
                        by {request.beatmapset_snapshot.artist}
                    </div>

                    <div className="text-xs text-tertiary-500 dark:text-tertiary-400 truncate">
                        Mapped by <a href={`https://osu.ppy.sh/users/${request.beatmapset_snapshot.user_id}`}
                                     className="font-semibold"
                                     target="_blank">{request.beatmapset_snapshot.user_profile.username}</a>
                    </div>

                    <div className="block lg:hidden text-xs text-tertiary-500 dark:text-tertiary-400 truncate">
                        Requested by <a href={`https://osu.ppy.sh/users/${request.user_id}`}
                                        className="font-semibold"
                                        target="_blank">{request.user_profile.username}</a>
                    </div>
                </div>

                <div className="hidden lg:flex items-center gap-2 truncate">
                    <a href={`https://osu.ppy.sh/users/${request.user_id}`}
                       className="size-10 shrink-0 bg-gray-500 rounded-full bg-cover" target="_blank"
                       style={{ backgroundImage: `url(${request.user_profile.avatar_url})` }}></a>
                    <div className="leading-5 truncate">
                        <div className="text-xs text-tertiary-500 dark:text-tertiary-400 truncate">
                            Requested by
                        </div>

                        <a href={`https://osu.ppy.sh/users/${request.user_id}`}
                           className="text-sm font-semibold"
                           target="_blank">{request.user_profile.username}</a>

                        <div className="lg:block hidden text-xs text-tertiary-500 dark:text-tertiary-400 truncate">
                            on <Link href={`/queues/${request.queue_id}`}
                                     className="font-semibold"
                                     target="_blank">{request.queue.name}</Link>
                        </div>
                    </div>
                </div>

                <div
                    className="hidden sm:flex flex-col gap-0 transition-[gap] duration-300 delay-300 ease-out group hover:gap-2 hover:delay-0">
                    <div className="flex items-center gap-1 self-stretch">
                        <MdRadioButtonChecked className="size-4 shrink-0 text-tertiary-500 dark:text-tertiary-400" />
                        <div className="flex items-center gap-0.5">
                            {
                                request.beatmapset_snapshot.beatmap_snapshots
                                    .sort((a, b) => a.difficulty_rating - b.difficulty_rating)
                                    .slice(0, 6)
                                    .map((beatmap, index) => (
                                        <div key={index} className="w-1.5 h-4 bg-gray-500 rounded-full"
                                             style={{ backgroundColor: ColorUtils.forStarRating(beatmap.difficulty_rating) }}></div>
                                    ))
                            }

                            {request.beatmapset_snapshot.beatmap_snapshots.length > 6 && (
                                <div className="text-xs ml-1 text-tertiary-500 dark:text-tertiary-400">
                                    +{request.beatmapset_snapshot.beatmap_snapshots.length - 6}
                                </div>
                            )}
                        </div>
                    </div>
                </div>


                <div className="text-tertiary-500 font-semibold gap-1 items-center hidden sm:flex">
                    {
                        request.comment.length > 0 && (
                            <>
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
                                            {request.comment}
                                        </div>
                                    </div>
                                )}
                            </>

                        )
                    }
                </div>

                {
                    editMode ? (
                        <>
                            {
                                isAdmin && (
                                    <div className="flex items-center justify-center">
                                        <SelectBeatmapsetStatus
                                            disabled={true}
                                            initialStatus={request.beatmapset_snapshot.verified ? "verified" : "unverified"} />
                                    </div>
                                )
                            }
                            <form ref={formRef} action={dispatchSelectRequestStatus}>
                            <div className="flex items-center justify-center">
                                <SelectRequestStatus name="status" initialStatus={selectRequestStatusState.status} onSelect={()=> formRef?.current?.requestSubmit()} isPending={isSelectRequestStatusPending} />
                            </div>
                            </form>
                        </>
                    ) : (
                        <>
                            {
                                isAdmin && (
                                    <div className="flex items-center justify-center">
                                        <BeatmapsetStatusBadge
                                            status={request.beatmapset_snapshot.verified ? "verified" : "unverified"} />
                                    </div>
                                )
                            }

                            <div className="flex items-center justify-center">
                                <RequestStatusBadge status={selectRequestStatusState.status} />
                            </div>
                        </>
                    )
                }
            </div>

            <a href={`https://osu.ppy.sh/beatmapsets/${request.beatmapset_id}`}
               target="_blank"
               className={`h-full flex items-center justify-center rounded-r-xl bg-tertiary-100 hover:bg-tertiary-200 active:bg-tertiary-300 dark:bg-tertiary-800 hover:dark:bg-tertiary-700 active:dark:bg-tertiary-600 pl-8 -ml-8 hover:w-20 w-14 transition-all duration-150 ease-in-out`}>
                <MdChevronRight className="size-6 shrink-0 text-tertiary-500 justify-self-end" />
            </a>
        </div>
    );
};

export default RequestPanelListView;
