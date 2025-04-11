"use client";

import React, { forwardRef, startTransition, useActionState, useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { createPortal } from "react-dom";
import Dialog from "@/components/shared/dialog";
import SelectQueues from "@/components/shared/selectQueues";
import Button from "@/components/shared/button";
import { postRequest } from "@/actions/requests";
import toast from "react-hot-toast";
import { FaCircleNotch } from "react-icons/fa6";

interface SubmitRequestParams {
    beatmapsetId: number;
    queues: number[];
    comment: string;
    userId: number;
}

interface SubmitRequestState {
    success: boolean | null;
    message: string;
}


const submitRequest = async (
    prevState: SubmitRequestState,
    { beatmapsetId, queues, comment, userId }: SubmitRequestParams
): Promise<SubmitRequestState> => {
    if (beatmapsetId === -1) {
        return { success: false, message: "Invalid beatmap link." };
    }

    for (const queue of queues) {
        const result = await postRequest({
            beatmapset_id: beatmapsetId,
            queue_id: queue,
            comment,
            user_id: userId,
            mv_checked: true,
        });

        if (!result) {
            return { success: false, message: "Failed to submit request." };
        }
    }

    return { success: true, message: "Your request has been submitted and is being processed!" };
};

interface RequestDialogProps {
    onClose: () => void;
}

const RequestDialog = forwardRef<HTMLDialogElement, RequestDialogProps>(
    ({ onClose }, ref) => {
        const [beatmapLink, setBeatmapLink] = useState<string>("");
        const [queues, setQueues] = useState<number[]>([]);
        const [comment, setComment] = useState<string>("");

        const getBeatmapsetId = (link: string): number => {
            const match = link.match(/https:\/\/osu.ppy.sh\/beatmapsets\/(\d+)/);
            return match ? parseInt(match[1], 10) : -1;
        };

        const handleQueuesChange = useCallback((queues: number[]) => {
            if (queues.length < 3) setQueues(queues);
        }, []);

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();

            if (!isAuthenticated || !user) return;

            const beatmapsetId = getBeatmapsetId(beatmapLink);

            startTransition(
                () => {
                    dispatch({
                        beatmapsetId,
                        queues,
                        comment,
                        userId: user.id,
                    });
                }
            );
        };

        const [state, dispatch, isPending] = useActionState<SubmitRequestState, SubmitRequestParams>(
            submitRequest,
            { success: null, message: "" }
        );

        useEffect(() => {
            if (state.success) {
                toast.success(state.message);

                setBeatmapLink("");
                setQueues([]);
                setComment("");

                onClose();
            } else if (state.success === false) {
                toast.error(state.message);
            }
        }, [state, onClose]);

        const { user, isAuthenticated } = useAuth();

        if (typeof document === undefined || !isAuthenticated) return null;

        return (
            createPortal(
                <Dialog title={"Request a Map"} ref={ref} onClose={onClose}>
                    <form className="flex flex-col gap-3 mt-2" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold dark:text-white">
                                Beatmapset Link<span className="text-red-500">*</span>
                            </span>
                            <input
                                className=
                                    "w-full sm:w-auto placeholder-tertiary-500 dark:placeholder-tertiary-400 whitespace-nowrap p-2 rounded-lg dark:bg-tertiary-900 outline-none border flex items-center justify-between gap-1 transition-colors duration-300 ease-in-out focus:border-primary-500 focus:bg-tertiary-100 focus:dark:bg-tertiary-800 border-tertiary-300 dark:border-tertiary-700"
                                type="url"
                                placeholder="Beatmapset Link"
                                value={beatmapLink}
                                onChange={(e) => setBeatmapLink(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold dark:text-white">
                                Queue(s)<span className="text-red-500">*</span>
                            </span>

                            <SelectQueues onSelect={handleQueuesChange} />

                            <span className="px-2 text-sm dark:text-tertiary-500 text-tertiary-400">
                                You can select up to 3 queues at once.
                            </span>
                        </div>

                        <div className="flex flex-col gap-1">
                        <span className="font-semibold dark:text-white">
                            Comment
                        </span>
                            <textarea
                                className=
                                    "w-full sm:w-auto placeholder-tertiary-500 dark:placeholder-tertiary-400 whitespace-nowrap p-2 rounded-lg dark:bg-tertiary-900 outline-none border flex items-center justify-between gap-1 transition-colors duration-300 ease-in-out focus:border-primary-500 focus:bg-tertiary-100 focus:dark:bg-tertiary-800 border-tertiary-300 dark:border-tertiary-700"
                                placeholder="Comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>
                        <footer className="flex justify-end gap-2 mt-2">
                            <Button
                                rounded="lg"
                                className="px-4 py-2"
                                type="submit"
                                disabled={!beatmapLink || !queues.length || isPending}
                            >
                                {isPending ? (
                                    <>
                                        Processing

                                        <div className="items-center justify-center flex ml-1.5">
                                            <FaCircleNotch className="size-4 animate-spin"/>
                                        </div>
                                    </>

                                ) : (
                                    <>
                                        Request
                                    </>
                                )}
                            </Button>
                        </footer>
                    </form>
                </Dialog>,
                document.body
            )
        );
    }
);

RequestDialog.displayName = "RequestDialog";

export default RequestDialog;
