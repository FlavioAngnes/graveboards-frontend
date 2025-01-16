'use client';

import React, {FC} from 'react';
import {Queue} from "@/types/queue";
import {MdChevronRight, MdCircle, MdEdit} from "react-icons/md";
import {useAuth} from "@/context/AuthContext";
import Link from "next/link";

interface QueuePanelProps {
    queue: Queue;
}

const QueuePanel: FC<QueuePanelProps> = ({queue}) => {
    const {user, isAdmin} = useAuth();
    const isManager = user && queue.display_data.manager_profiles.some(manager => manager.username === user.profile.username);

    return (
        <div className="flex rounded-xl overflow-hidden">
            <div
                className="z-10 px-8 py-6 flex-col gap-8 lg:flex-row w-full flex justify-between items-center rounded-xl bg-tertiary-50 dark:text-white dark:bg-tertiary-900 self-stretch transition-colors duration-300 ease-in-out overflow-hidden">
                <div className="flex items-center gap-6 flex-1 overflow-hidden">
                    <div className="max-[400px]:hidden size-24 rounded-xl shrink-0 bg-cover"
                         style={{backgroundImage: `url(${queue.display_data.owner_profile.avatar_url})`}}></div>
                    <div className="flex flex-col gap-1.5 flex-1 text-left">
                        <div>
                            <div className="font-semibold">{queue.name}</div>
                            <div className="text-sm text-tertiary-500">Owned by <Link
                                href={`https://osu.ppy.sh/users/${queue.user_id}`}
                                className="font-semibold"
                                target="_blank">{queue.display_data.owner_profile.username}</Link>
                                {
                                    queue.display_data.manager_profiles.length > 0 && (
                                        <>
                                            • Managed by
                                            {
                                                queue.display_data.manager_profiles.map((manager, index) => (
                                                    <span key={index}>
                                                    <a href={`https://osu.ppy.sh/users/${manager}`}
                                                       className="font-semibold" target="_blank">{manager.username}</a>
                                                        {index < queue.display_data.manager_profiles.length - 1 && ', '}
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
                    <div className="flex items-center justify-self-end gap-8">
                        <div className="text-sm text-green-500 flex gap-1.5 items-center">
                            <MdCircle/>
                            <div className="hidden sm:block">
                                Open
                            </div>
                        </div>
                        {(isManager || isAdmin) && (
                            <Link
                                href={`/queues/${queue.id}/manage`}
                                className="bg-primary-500 hover:bg-primary-400 active:bg-primary-300 text-white px-6 py-2.5 rounded-full lg:flex hidden items-center gap-1.5 shrink-0 transition-all duration-300 ease-in-out min-w-12 lg:min-w-44">
                                <MdEdit className="size-6"/>
                                <p className="lg:block hidden">Manage Queue</p>
                                <p className="block lg:hidden">Manage</p>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <Link
                href={`/queues/${queue.id}`}
                className={`flex items-center justify-center bg-tertiary-100 hover:bg-tertiary-200 active:bg-tertiary-300 dark:bg-tertiary-800 hover:dark:bg-tertiary-700 active:dark:bg-tertiary-600 pl-8 -ml-8 hover:w-20 w-14 transition-all duration-150 ease-in-out`}>
                <MdChevronRight className="size-6 shrink-0 text-tertiary-500 justify-self-end"/>
            </Link>
        </div>

    );
};

export default QueuePanel;
