import React, { FC, useEffect, useRef, useState } from "react";
import { BeatmapsetListSortingLayerValue } from "@/types/beatmapsets/sorting";
import {
    MdMusicNote,
    MdOutlineKeyboardArrowDown,
    MdOutlineKeyboardArrowRight,
    MdOutlineKeyboardArrowUp,
    MdOutlineQueueMusic,
    MdPersonOutline
} from "react-icons/md";
import clsx from "clsx";
import { BeatmapsetListSortingLayerMap } from "@/data/beatmapsets/sorting";

interface SelectValueProps {
    items: BeatmapsetListSortingLayerValue[],
    selectedItem: BeatmapsetListSortingLayerValue,
    onSelect: (value: BeatmapsetListSortingLayerValue) => void,
}

const SelectValue: FC<SelectValueProps> = ({items, selectedItem, onSelect }) => {
    const [open, setOpen] = useState(false);

    const handleSelect = (value: BeatmapsetListSortingLayerValue) => {
        onSelect(value);
        setOpen(false);
    };

    const filterByCategory = (category: string) =>
        Object.entries(BeatmapsetListSortingLayerMap).filter(
            ([key]) => key.startsWith(`${category}.`) &&
                !items.some((item) => item === key as BeatmapsetListSortingLayerValue)
        );

    const groups = {
        Profile: {
            values: filterByCategory("Profile"),
            label: "Mapper",
            icon: <MdPersonOutline className="size-4" />
        },
        BeatmapsetSnapshot: {
            values: filterByCategory("BeatmapsetSnapshot"),
            label: "Beatmapset",
            icon: <MdOutlineQueueMusic className="size-4" />
        },
        BeatmapSnapshot: {
            values: filterByCategory("BeatmapSnapshot"),
            label: "Beatmap",
            icon: <MdMusicNote className="size-4" />
        },
        Request: {
            values: filterByCategory("Request"),
            label: "Request",
            icon: <MdPersonOutline className="size-4" />
        }
    };

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
                `border-transparent relative w-full transition-colors duration-300 ease-in-out sm:border-0 sm:rounded-none border-[1px] rounded-lg`,
                { "sm:border-primary-500": open }
            )}>
            <button
                className={clsx(
                    `w-full whitespace-nowrap p-2 sm:rounded-lg backdrop-blur hover:bg-tertiary-100 active:bg-tertiary-200 dark:hover:bg-tertiary-800 border-[1px] flex items-center justify-between gap-1 transition-colors duration-300 ease-in-out`,
                    open ? "border-primary-500 bg-tertiary-100 dark:bg-tertiary-800 rounded-t-lg" : "border-tertiary-300 dark:border-tertiary-700 rounded-lg"
                )}
                onClick={() => setOpen(!open)}>
                <div className="flex items-center gap-1 w-full">
                    <div className="max-[475px]:hidden flex items-center gap-1">
                        {groups[selectedItem.split(".")[0] as keyof typeof groups].icon}
                        {groups[selectedItem.split(".")[0] as keyof typeof groups].label}
                    </div>
                    <MdOutlineKeyboardArrowRight className="sm:block max-[475px]:hidden text-tertiary-500 shrink-0" />
                    <div className="flex items-center gap-1">
                        {BeatmapsetListSortingLayerMap[selectedItem].icon}
                        {BeatmapsetListSortingLayerMap[selectedItem].label}
                    </div>
                </div>
                {open ? (
                    <MdOutlineKeyboardArrowUp className="size-5" />
                ) : (
                    <MdOutlineKeyboardArrowDown className="size-5" />
                )}
            </button>
            {open && (
                <div
                    className="absolute overflow-hidden sm:mt-2 z-10 flex flex-col bg-tertiary-100 dark:bg-tertiary-900 sm:border-[1px] border-t-0 sm:border-t-[1px] border-tertiary-400 dark:border-tertiary-700 border-[1px] rounded-b-lg sm:rounded-lg min-w-full max-h-[19.25rem] snap-y">
                    {
                        Object.entries(groups).map(([key, value]) => value.values.length > 0 && (
                            <SelectSortingItem
                                key={key}
                                label={value.label}
                                icon={value.icon}
                                values={
                                    value.values.map(([key, value]) => ({
                                        icon: value.icon,
                                        label: value.label,
                                        value: key as BeatmapsetListSortingLayerValue
                                    }))
                                }
                                onSelect={handleSelect} />
                        ))
                    }
                </div>
            )}
        </div>
    );
};

interface SelectSortingItemProps {
    icon: React.ReactNode;
    label: string;
    values: {
        icon: React.ReactNode;
        label: string;
        value: BeatmapsetListSortingLayerValue;
    }[];
    onSelect: (value: BeatmapsetListSortingLayerValue) => void;
}

const SelectSortingItem: FC<SelectSortingItemProps> = ({ icon, label, values, onSelect }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div
                className={clsx(
                    `relative cursor-pointer w-full whitespace-nowrap p-2.5 flex items-center justify-between hover:bg-tertiary-200 dark:hover:bg-tertiary-800 active:dark:bg-tertiary-700 active:bg-tertiary-300 transition-colors duration-300 ease-in-out`,
                    open ? "bg-tertiary-100 dark:bg-tertiary-800 text-black dark:text-white" : "text-tertiary-500 dark:text-tertiary-400"
                )}
                onClick={() => setOpen(!open)}>
                <div className="flex gap-1.5 items-center">
                    {icon}
                    {label}
                </div>

                {open ? (
                    <MdOutlineKeyboardArrowUp className="size-5" />
                ) : (
                    <MdOutlineKeyboardArrowDown className="size-5" />
                )}
            </div>
            {open && (
                <div
                    className="border-tertiary-500 dark:border-tertiary-700 flex flex-col bg-tertiary-50 dark:bg-tertiary-900 min-w-full max-h-[50vh] overflow-y-scroll snap-y">
                    {
                        values.map((value, index) => (
                            <button
                                className="text-tertiary-500 dark:text-tertiary-400 whitespace-nowrap p-2.5 flex-1 flex items-center gap-1.5 snap-start hover:bg-tertiary-100 active:bg-tertiary-200 active:text-black dark:hover:bg-tertiary-800 active:dark:bg-tertiary-700 active:dark:text-white transition-colors duration-300 ease-in-out"
                                key={index}
                                onClick={
                                    () => {
                                        onSelect(value.value);
                                        setOpen(false);
                                    }
                                }>
                                <div className="size-4">
                                    {value.icon}
                                </div>
                                {value.label}
                            </button>
                        ))
                    }
                </div>
            )}
        </>
    );
};

export default SelectValue;
