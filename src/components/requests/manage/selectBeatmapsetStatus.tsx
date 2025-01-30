import React, {FC, useEffect, useRef, useState} from 'react';
import clsx from "clsx";
import {MdCheck, MdOutlineKeyboardArrowDown} from "react-icons/md";
import BeatmapsetStatusBadge from "@/components/beatmapsets/badge/beatmapsetStatusBadge";

interface SelectBeatmapsetStatusProps {
    initialStatus: "verified" | "unverified";
    disabled?: boolean;
}

const SelectBeatmapsetStatus: FC<SelectBeatmapsetStatusProps> = ({ initialStatus, disabled }) => {
    const [open, setOpen] = useState(false);

    const [status, setStatus] = useState<"verified" | "unverified">(initialStatus);

    const statuses = ["verified", "unverified"] as const;

    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={dropdownRef}
            className={clsx(
                `relative transition-colors duration-300 ease-in-out border-0 rounded-none`,
                open ? "border-primary-500" : "border-transparent",
            )}>
            <button
                disabled={disabled}
                type="button"
                className={clsx(
                    `w-full whitespace-nowrap p-2 rounded-lg border-[1px] enabled:hover:bg-tertiary-100 enabled:active:bg-tertiary-200 enabled:dark:hover:bg-tertiary-800 enabled:dark:active:bg-tertiary-700 disabled:opacity-50 flex items-center justify-between gap-1 transition-colors duration-300 ease-in-out`,
                    open ? 'border-primary-500 bg-tertiary-100 dark:bg-tertiary-800 rounded-t-lg' : 'border-tertiary-300 dark:border-tertiary-700 rounded-lg',
                )}
                onClick={() => setOpen(!open)}>
                <div className="flex items-center gap-1 flex-wrap">
                    <BeatmapsetStatusBadge status={status} truncate={true}/>
                </div>

                <MdOutlineKeyboardArrowDown className="size-5"/>
            </button>
            {open && (
                <div
                    className="absolute overflow-hidden mt-2 flex flex-col z-10 bg-tertiary-100 dark:bg-tertiary-900 border-[1px] border-tertiary-400 dark:border-tertiary-700 rounded-lg min-w-full max-h-[19.25rem] snap-y">
                    {statuses.map(beatmapsetStatus => (
                        <SelectBeatmapsetStatusItem
                            key={beatmapsetStatus}
                            status={beatmapsetStatus}
                            selectStatus={
                                (status) => {
                                    setStatus(status);
                                    setOpen(false);
                                }
                            }
                            selected={status === beatmapsetStatus}
                        />
                    ))}
                </div>

            )}
        </div>
    );
};

interface SelectBeatmapsetStatusItemProps {
    status: "verified" | "unverified";
    selectStatus: (status:  "verified" | "unverified") => void;
    selected: boolean;
}

const SelectBeatmapsetStatusItem: FC<SelectBeatmapsetStatusItemProps> = ({status, selectStatus, selected}) => {
    return (
        <button
            type="button"
            className={
                clsx(
                    selected ? "bg-tertiary-200 dark:bg-tertiary-800 text-black dark:text-white" : "text-tertiary-500 dark:text-tertiary-400",
                    "whitespace-nowrap p-2 flex-1 flex gap-1.5 items-center justify-between hover:bg-tertiary-200 active:bg-tertiary-300 active:text-black dark:hover:bg-tertiary-800 active:dark:bg-tertiary-700 active:dark:text-white transition-colors duration-300 ease-in-out"
                )
            }
            onClick={() => selectStatus(status)}
        >
            <BeatmapsetStatusBadge status={status}/>

            {selected && (
                <div className="flex items-center justify-center text-black dark:text-white rounded-full w-6 h-6 shrink-0">
                    <MdCheck/>
                </div>
            )}
        </button>
    )
}

export default SelectBeatmapsetStatus;
