"use client";

import React, { FC } from "react";
import { Queue } from "@/types/queue";
import QueueStatus from "@/components/queues/status/queueStatus";
import ManageQueueButton from "@/components/queues/manage/manageQueueButton";

interface QueueHeaderProps {
    queue: Queue;
}

const QueueHeader: FC<QueueHeaderProps> = ({ queue }) => {

    return (
        <div
            className="px-8 py-6 flex-col gap-8 lg:flex-row flex justify-between items-center rounded-xl dark:text-white self-stretch transition-colors duration-300 ease-in-out">
            <div className="flex flex-col lg:flex-row items-center gap-6 flex-1">
                <div className="flex flex-col sm:flex-row items-center gap-6 flex-1">
                    <div className="size-24 rounded-xl shrink-0 bg-cover"
                         style={{ backgroundImage: `url(${queue.user_profile.avatar_url})` }}></div>
                    <div className="flex flex-col gap-1.5 flex-1">
                        <div>
                            <div className="font-semibold">{queue.name}</div>
                            <div className="text-sm text-tertiary-500">Owned by <a
                                href={`https://osu.ppy.sh/users/${queue.user_id}`}
                                className="font-semibold"
                                target="_blank">{queue.user_profile.username}</a>
                                {
                                    queue.manager_profiles.length > 0 && (
                                        <>
                                            • Managed by
                                            {
                                                queue.manager_profiles.map((manager, index) => (
                                                    <span key={index}>
                                                    <a href={`https://osu.ppy.sh/users/${manager.id}`}
                                                       className="font-semibold" target="_blank">{manager.username}</a>
                                                        {index < queue.manager_profiles.length - 1 && ", "}
                                                </span>
                                                ))
                                            }
                                        </>
                                    )
                                }
                            </div>
                        </div>
                        <div className="text-sm text-tertiary-500 line-clamp-2 text-ellipsis">{queue.description}</div>
                    </div>
                </div>

                <div className="flex items-center justify-self-end gap-4">
                    <QueueStatus isOpen={queue.is_open} />
                    <ManageQueueButton queue={queue} />
                </div>
            </div>
        </div>
    );
};

export default QueueHeader;
