import React, {FC, useEffect, useRef, useState} from "react";
import {BeatmapsetListSortingLayerOptions, BeatmapsetListSortingLayerValue} from "@/types/beatmapsets/sorting";
import {
    MdMusicNote,
    MdOutlineKeyboardArrowDown,
    MdOutlineKeyboardArrowRight,
    MdOutlineKeyboardArrowUp,
    MdOutlineQueueMusic,
    MdPersonOutline,
    MdQuestionMark
} from "react-icons/md";
import {IoMdNotificationsOutline} from "react-icons/io";
import clsx from "clsx";
import {BeatmapsetListSortingLayerMap} from "@/data/beatmapsets/sorting";

interface SelectValueProps {
    values: BeatmapsetListSortingLayerOptions[],
    value: BeatmapsetListSortingLayerValue,
    onChange?: (value: BeatmapsetListSortingLayerValue) => void,
}

const SelectValue: FC<SelectValueProps> = ({values, value, onChange}) => {
    const [open, setOpen] = useState(false);

    const [label, setLabel] = useState<string>("Unknown");
    const [icon, setIcon] = useState<React.ReactNode>(<MdQuestionMark className="size-4"/>);

    useEffect(() => {
        // Custom labels and icons for each sorting option
        switch (value.split('.')[0]) {
            case 'Profile':
                setLabel('Mapper')
                setIcon(<MdPersonOutline className="size-5"/>)
                break
            case 'BeatmapsetSnapshot':
                setLabel('Beatmapset')
                setIcon(<MdOutlineQueueMusic className="size-5"/>)
                break
            case 'BeatmapSnapshot':
                setLabel('Beatmap')
                setIcon(<MdMusicNote className="size-5"/>)
                break
            case 'Request':
                setLabel('Request')
                setIcon(<MdPersonOutline className="size-5"/>)
                break
        }
    }, [value]);

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

    const handleChange = (value: BeatmapsetListSortingLayerValue) => {
        if (onChange) {
            onChange(value);
        }
    }

    const profileValues = Object.entries(BeatmapsetListSortingLayerMap)
        .filter(
            ([key]) => key.split('.')[0] === 'Profile' && !values.map(sorting => sorting.value).includes(key as BeatmapsetListSortingLayerValue)
        )

    const beatmapsetValues = Object.entries(BeatmapsetListSortingLayerMap)
        .filter(
            ([key]) => key.split('.')[0] === 'BeatmapsetSnapshot' && !values.map(sorting => sorting.value).includes(key as BeatmapsetListSortingLayerValue)
        )

    const beatmapValues = Object.entries(BeatmapsetListSortingLayerMap)
        .filter(
            ([key]) => key.split('.')[0] === 'BeatmapSnapshot' && !values.map(sorting => sorting.value).includes(key as BeatmapsetListSortingLayerValue)
        )

    const requestValues = Object.entries(BeatmapsetListSortingLayerMap)
        .filter(
            ([key]) => key.split('.')[0] === 'Request' && !values.map(sorting => sorting.value).includes(key as BeatmapsetListSortingLayerValue)
        )

    return (
        <div
            ref={dropdownRef}
             className={clsx(
                 `relative transition-colors duration-300 ease-in-out sm:border-0 sm:rounded-none border-[1px] rounded-lg`,
                 open ? "border-primary-500" : "border-transparent"
             )}>
            <button
                className={clsx(
                    `w-full sm:w-auto whitespace-nowrap p-2 sm:rounded-lg sm:backdrop-blur hover:bg-tertiary-100 active:bg-tertiary-200 dark:hover:bg-tertiary-800 sm:border-[1px] flex items-center justify-between gap-1 transition-colors duration-300 ease-in-out`,
                    open ? 'border-primary-500 bg-tertiary-100 dark:bg-tertiary-800 rounded-t-lg' : 'border-tertiary-300 dark:border-tertiary-700 rounded-lg'
                )}
                onClick={() => setOpen(!open)}>
                <div className="flex items-center gap-1 w-full">
                    <div className="max-[475px]:hidden flex items-center gap-1">
                        {icon}
                        {label}
                    </div>
                    <MdOutlineKeyboardArrowRight className="sm:block max-[475px]:hidden text-tertiary-500 shrink-0"/>
                    <div className="flex items-center gap-1">
                        {BeatmapsetListSortingLayerMap[value].icon}
                        {BeatmapsetListSortingLayerMap[value].label}
                    </div>
                </div>
                <MdOutlineKeyboardArrowDown className="size-5 shrink-0"/>
            </button>
            {open && (
                <div
                    className="sm:absolute overflow-hidden sm:mt-2 z-10 flex flex-col bg-tertiary-100 dark:bg-tertiary-900 sm:border-[1px] border-tertiary-500 rounded-b-lg sm:rounded-lg min-w-full max-h-[19.25rem] snap-y">
                    {
                        profileValues.length > 0 && (
                            <SelectSortingItem
                                label="Mapper"
                                icon={<MdPersonOutline className="size-4"/>}
                                values={
                                    profileValues.map(([key, value]) => ({
                                        icon: value.icon,
                                        label: value.label,
                                        value: key as BeatmapsetListSortingLayerValue
                                    }))
                                }
                                setValue={handleChange}/>
                        )
                    }
                    {
                        beatmapsetValues.length > 0 && (
                            <SelectSortingItem
                                label="Beatmapset"
                                icon={<MdOutlineQueueMusic className="size-4"/>}
                                values={
                                    beatmapsetValues.map(([key, value]) => ({
                                        icon: value.icon,
                                        label: value.label,
                                        value: key as BeatmapsetListSortingLayerValue
                                    }))
                                }
                                setValue={handleChange}/>
                        )
                    }
                    {
                        beatmapValues.length > 0 && (
                            <SelectSortingItem
                                label="Beatmap"
                                icon={<MdMusicNote className="size-4"/>}
                                values={
                                    beatmapValues.map(([key, value]) => ({
                                        icon: value.icon,
                                        label: value.label,
                                        value: key as BeatmapsetListSortingLayerValue
                                    }))
                                }
                                setValue={handleChange}/>
                        )
                    }
                    {
                        requestValues.length > 0 && (
                            <SelectSortingItem
                                label="Request"
                                icon={<IoMdNotificationsOutline className="size-4"/>}
                                values={
                                    requestValues.map(([key, value]) => ({
                                        icon: value.icon,
                                        label: value.label,
                                        value: key as BeatmapsetListSortingLayerValue
                                    }))
                                }
                                setValue={handleChange}/>
                        )
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
    setValue: (value: BeatmapsetListSortingLayerValue) => void;
}

const SelectSortingItem: FC<SelectSortingItemProps> = ({icon, label, values, setValue}) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                className={clsx(
                    `w-full whitespace-nowrap p-2.5 flex items-center justify-between hover:bg-tertiary-200 dark:hover:bg-tertiary-800 active:dark:bg-tertiary-700 active:bg-tertiary-300 transition-colors duration-300 ease-in-out`,
                    open ? 'bg-tertiary-100 dark:bg-tertiary-800 text-black dark:text-white' : 'text-tertiary-500 dark:text-tertiary-400'
                )}
                onClick={() => setOpen(!open)}>
                <div className="flex gap-1.5 items-center">
                    {icon}
                    {label}
                </div>

                {open ? (
                    <MdOutlineKeyboardArrowUp className="size-5"/>
                ) : (
                    <MdOutlineKeyboardArrowDown className="size-5"/>
                )}
            </button>
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
                                        setValue(value.value);
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
    )
}

export default SelectValue;
