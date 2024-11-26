'use client';

import React, {FC} from 'react';
import {Queue} from "@/types/Queue";
import {MdChevronRight, MdCircle, MdEdit} from "react-icons/md";
import {useAuth} from "@/context/AuthContext";

interface QueuePanelProps {
    queue: Queue;
}

const QueuePanel: FC<QueuePanelProps> = ({queue}) => {
    const {user, isAdmin} = useAuth();

    return (
        <div
            className="cursor-pointer px-8 py-6 flex-col gap-8 lg:flex-row flex justify-between items-center rounded-xl bg-tertiary-50 hover:bg-tertiary-100 hover:dark:bg-tertiary-800 dark:text-white dark:bg-tertiary-900 self-stretch transition-colors duration-300 ease-in-out overflow-hidden">
            <div className="flex items-center gap-6 flex-1 overflow-hidden">
                <div className="max-[400px]:hidden size-24 bg-tertiary-100 dark:bg-tertiary-800 rounded-xl shrink-0"></div>
                <div className="flex flex-col gap-1.5 flex-1">
                    <div>
                        <div className="font-semibold">{queue.name}</div>
                        <div className="text-sm text-tertiary-500">Owned by <a
                            href={`https://osu.ppy.sh/users/${queue.user_id}`}
                            className="font-semibold" target="_blank">{queue.user_id}</a>
                            {
                                queue.managers.length > 0 && (
                                    <>
                                        • Managed by
                                        {
                                            queue.managers.map((manager, index) => (
                                                <span key={index}>
                                                    <a href={`https://osu.ppy.sh/users/${manager}`}
                                                       className="font-semibold" target="_blank">{manager}</a>
                                                    {index < queue.managers.length - 1 && ', '}
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
                    {(user?.id && queue.managers.includes(user?.id) || isAdmin) && (
                        <button
                            className="bg-primary-500 hover:bg-primary-400 active:bg-primary-300 text-white px-6 py-2.5 rounded-full lg:flex hidden items-center gap-1.5 shrink-0 transition-all duration-300 ease-in-out min-w-12 lg:min-w-44">
                            <MdEdit className="size-6"/>
                            <p className="lg:block hidden">Manage Queue</p>
                            <p className="block lg:hidden">Manage</p>
                        </button>
                    )}
                    <MdChevronRight className="size-6 shrink-0 text-tertiary-500"/>
                </div>
            </div>
        </div>
    );
};

export default QueuePanel;
