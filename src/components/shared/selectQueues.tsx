import React, { FC, useEffect, useRef, useState } from "react";
import useSWRQueues from "@/hooks/queues/useSWRQueues";
import QueueChip from "@/components/shared/queueChip";
import { Queue } from "@/types/queue";
import clsx from "clsx";
import { MdCheck, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";

interface SelectQueuesProps {
    onSelect: (queues: number[]) => void;
}

const SelectQueues: FC<SelectQueuesProps> = ({ onSelect }) => {
    const params = useParams<{ id: string }>();

    const [open, setOpen] = useState(false);

    const [selected, setSelected] = useState<Queue[]>([]);

    const { queues, hasMore, size, setSize } = useSWRQueues({ limit: 10 });
    const { data: queue } = useSWR(`/api/queues/${Number(params.id) || 1}`, fetcher, {
        revalidateOnFocus: false
    });

    const isSelected = (queue: Queue) => selected.some(q => q.id === queue.id);

    const handleRemove = (queue: Queue) => {
        onSelect(selected.filter(q => q.id !== queue.id).map(queue => queue.id));
        setSelected(selected.filter(q => q.id !== queue.id));
    };

    const handleSelect = (queue: Queue) => {
        if (isSelected(queue)) {
            handleRemove(queue);
        } else {
            setSelected([...selected, queue]);
            onSelect([...selected, queue].map(queue => queue.id));
        }
    };

    useEffect(() => {
        if (queue) {
            setSelected([queue]);
            onSelect([queue.id]);
        }
    }, [queue]);

    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={dropdownRef}
            className={clsx(
                `w-full border-transparent relative transition-colors duration-300 ease-in-out sm:border-0 sm:rounded-none border-[1px] rounded-lg`,
                open ? "border-primary-500" : "border-transparent"
            )}>
            <button
                type="button"
                className={clsx(
                    `w-full whitespace-nowrap p-2 sm:rounded-lg backdrop-blur border-[1px] enabled:hover:bg-tertiary-100 enabled:active:bg-tertiary-200 enabled:dark:hover:bg-tertiary-800 enabled:dark:active:bg-tertiary-700 disabled:opacity-50 flex items-center justify-between gap-1 transition-colors duration-300 ease-in-out`,
                    open ? "border-primary-500 bg-tertiary-100 dark:bg-tertiary-800 rounded-t-lg" : "border-tertiary-300 dark:border-tertiary-700 rounded-lg"
                )}
                onClick={() => setOpen(!open)}>
                <div className="flex items-center gap-1 w-full flex-wrap">
                    {selected.map(queue => (
                        <QueueChip key={queue.id} queue={queue} removeQueue={handleRemove} />
                    ))}

                    {selected.length === 0 && (
                        <p
                            className={clsx(open ? "text-black dark:text-white" : "text-tertiary-400", "transition-colors duration-300 ease-in-out")}>BN
                            Queue</p>
                    )}
                </div>

                <MdOutlineKeyboardArrowDown className="size-5 shrink-0" />
            </button>
            {open && (
                <div
                    className="absolute overflow-hidden sm:mt-2 flex flex-col z-50 bg-tertiary-100 dark:bg-tertiary-900 sm:border-[1px] border-t-0 sm:border-t-[1px] border-tertiary-400 dark:border-tertiary-700 border-[1px] rounded-b-lg sm:rounded-lg min-w-full max-h-[19.25rem] snap-y">
                    {queues.map(queue => (
                        <SelectQueuesItem
                            key={queue.id}
                            queue={queue}
                            onSelect={handleSelect}
                            selected={isSelected(queue)}
                        />
                    ))}

                    {
                        hasMore && (
                            <button
                                type="button"
                                onClick={() => setSize(size + 1)}
                                className="p-2 text-tertiary-500 dark:text-tertiary-400 hover:bg-tertiary-200 active:bg-tertiary-300 dark:hover:bg-tertiary-800 active:dark:bg-tertiary-700 transition-colors duration-300 ease-in-out">
                                Load More
                            </button>
                        )
                    }
                </div>

            )}
        </div>
    );
};

interface SelectQueuesItemProps {
    queue: Queue;
    onSelect: (queue: Queue) => void;
    selected: boolean;
}

const SelectQueuesItem: FC<SelectQueuesItemProps> = ({ queue, onSelect, selected }) => {
    return (
        <button
            type="button"
            className={
                clsx(
                    selected ? "bg-tertiary-200 dark:bg-tertiary-800 text-black dark:text-white" : "text-tertiary-500 dark:text-tertiary-400",
                    "whitespace-nowrap p-2 flex-1 flex gap-1.5 items-center justify-between hover:bg-tertiary-200 active:bg-tertiary-300 active:text-black dark:hover:bg-tertiary-800 active:dark:bg-tertiary-700 active:dark:text-white transition-colors duration-300 ease-in-out"
                )
            }
            key={queue.id}
            onClick={() => onSelect(queue)}
        >
            <div className="flex items-center gap-1.5">
                <div
                    className="size-4 bg-gray-500 rounded-full bg-cover"
                    style={{ backgroundImage: `url(${queue.user_profile.avatar_url})` }}></div>
                {queue.name}
            </div>

            {selected && (
                <div className="flex items-center justify-center text-black dark:text-white rounded-full w-6 h-6">
                    <MdCheck />
                </div>
            )}
        </button>
    );
};

export default SelectQueues;
