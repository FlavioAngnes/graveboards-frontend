import React, {FC, useEffect, useRef, useState} from "react";
import {
    SortingLayerOptions,
    SortingLayerValue,
    SortingLayerMap
} from "@/types/beatmapsets/Sorting";
import {
    MdMusicNote,
    MdOutlineKeyboardArrowDown,
    MdOutlineKeyboardArrowRight,
    MdOutlineQueueMusic,
    MdPersonOutline,
    MdQuestionMark
} from "react-icons/md";
import {IoMdNotificationsOutline} from "react-icons/io";

interface SelectValueProps {
    values: SortingLayerOptions[],
    value: SortingLayerValue,
    onChange?: (value: SortingLayerValue) => void,
}

const SelectValue: FC<SelectValueProps> = ({values, value, onChange}) => {
    const [label, setLabel] = useState<string>("Unknown");
    const [icon, setIcon] = useState<React.ReactNode>(<MdQuestionMark className="size-5"/>);

    const [open, setOpen] = useState(false);

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

    const handleChange = (value: SortingLayerValue) => {
        if (onChange) {
            onChange(value);
        }
    }

    return (
        <div ref={dropdownRef} className="relative">
            <button
                className={
                    `whitespace-nowrap p-2 rounded-lg backdrop-blur hover:bg-tertiary-100 active:bg-tertiary-200 dark:hover:bg-tertiary-800 border-[1px] flex items-center gap-1 transition-colors duration-300 ease-in-out
                    ${open ? 'border-primary-500 bg-tertiary-100 dark:bg-tertiary-800' : 'border-tertiary-300 dark:border-tertiary-700'}`
                }
                onClick={() => setOpen(!open)}>
                {icon}
                {label}
                <MdOutlineKeyboardArrowRight className={"text-tertiary-500"}/>
                {SortingLayerMap[value].icon}
                {SortingLayerMap[value].label}
                <MdOutlineKeyboardArrowDown className="size-5"/>
            </button>
            {open && (
                <div
                    className="absolute mt-2 z-10 flex flex-col bg-tertiary-100 dark:bg-tertiary-900 border-[1px] border-tertiary-500 rounded-lg min-w-full max-h-[19.25rem] snap-y">
                    <SelectSortingItem
                        label="Mapper"
                        icon={
                            <MdPersonOutline className="size-5"/>
                        }
                        values={
                            Object.entries(SortingLayerMap)
                                .filter(
                                    ([key]) => key.split('.')[0] === 'Profile' && !values.map(sorting => sorting.value).includes(key as SortingLayerValue)
                                )
                                .map(
                                    ([key, value]) => ({
                                        icon: value.icon,
                                        label: value.label,
                                        value: key as SortingLayerValue
                                    })
                                )
                        }
                        setValue={handleChange}/>
                    <SelectSortingItem
                        label="Beatmapset"
                        icon={
                            <MdOutlineQueueMusic className="size-5"/>
                        }
                        values={
                            Object.entries(SortingLayerMap)
                                .filter(
                                    ([key]) => key.split('.')[0] === 'BeatmapsetSnapshot' && !values.map(sorting => sorting.value).includes(key as SortingLayerValue)
                                )
                                .map(
                                    ([key, value]) => ({
                                        icon: value.icon,
                                        label: value.label,
                                        value: key as SortingLayerValue
                                    })
                                )
                        }
                        setValue={handleChange}
                    />
                    <SelectSortingItem
                        label="Beatmap"
                        icon={
                            <MdMusicNote className="size-5"/>
                        }
                        values={
                            Object.entries(SortingLayerMap)
                                .filter(
                                    ([key]) => key.split('.')[0] === 'BeatmapSnapshot' && !values.map(sorting => sorting.value).includes(key as SortingLayerValue)
                                )
                                .map(
                                    ([key, value]) => ({
                                        icon: value.icon,
                                        label: value.label,
                                        value: key as SortingLayerValue
                                    })
                                )
                        }
                        setValue={handleChange}
                    />
                    <SelectSortingItem
                        label="Request"
                        icon={
                            <IoMdNotificationsOutline className="size-5"/>
                        }
                        values={
                            Object.entries(SortingLayerMap)
                                .filter(
                                    ([key]) => key.split('.')[0] === 'Request' && !values.map(sorting => sorting.value).includes(key as SortingLayerValue)
                                )
                                .map(
                                    ([key, value]) => ({
                                        icon: value.icon,
                                        label: value.label,
                                        value: key as SortingLayerValue
                                    })
                                )
                        }
                        setValue={handleChange}
                    />
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
        value: SortingLayerValue;
    }[];
    setValue: (value: SortingLayerValue) => void;
}

const SelectSortingItem: FC<SelectSortingItemProps> = ({icon, label, values, setValue}) => {
    const [open, setOpen] = useState(false);

    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && !buttonRef.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <button
                ref={buttonRef}
                className={`${open ? 'bg-tertiary-100 dark:bg-tertiary-800 text-black dark:text-white' : 'text-tertiary-500 dark:text-tertiary-400'} whitespace-nowrap p-2.5 flex-1 flex items-center justify-between hover:bg-tertiary-200 dark:hover:bg-tertiary-800 active:dark:bg-tertiary-700 active:bg-tertiary-300 transition-colors duration-300 ease-in-out`}
                onClick={() => setOpen(!open)}>
                <div className="flex gap-1.5 items-center">
                    {icon}
                    {label}
                </div>

                <MdOutlineKeyboardArrowRight className="size-5"/>
            </button>
            {open && (
                <div
                    ref={dropdownRef}
                    className="absolute border-[1px] border-tertiary-500 right-full mr-2 z-20 flex flex-col bg-tertiary-100 dark:bg-tertiary-900 rounded-lg min-w-full max-h-[19.25rem] overflow-y-scroll snap-y">
                    {
                        values.map((value, index) => (
                            <button
                                className="text-tertiary-500 dark:text-tertiary-400 whitespace-nowrap p-2.5 flex-1 flex items-center gap-1.5 snap-start"
                                key={index} onClick={
                                () => {
                                    setValue(value.value);
                                    setOpen(false);
                                }
                            }>
                                {value.icon}
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
