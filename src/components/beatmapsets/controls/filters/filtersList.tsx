import React, { FC, useEffect, useState } from "react";
import { useFilters } from "@/context/beatmapsets/FiltersContext";
import {
    MdClose,
    MdFilterList,
    MdOutlineFilterAlt,
    MdOutlineKeyboardArrowDown,
    MdOutlineKeyboardArrowUp,
    MdUndo
} from "react-icons/md";
import clsx from "clsx";
import FiltersInput from "@/components/beatmapsets/controls/filters/filtersInput";

const FiltersList = () => {
    const [open, setOpen] = React.useState(false);

    const { canApply, canClear, clearFilters, undoFilters, applyFilters, appliedFilters, filters } = useFilters();

    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    const filtersRef = React.useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (buttonRef.current && !buttonRef.current.contains(e.target as Node) && filtersRef.current && !filtersRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <>
            <button
                ref={buttonRef}
                onClick={() => setOpen(!open)}
                className={clsx(
                    `p-1 size-9 rounded-lg hover:bg-tertiary-100 active:bg-tertiary-200 hover:dark:bg-tertiary-900 active:dark:bg-tertiary-800 flex items-center border-2 justify-center transition-colors duration-300 ease-in-out`,
                    { "bg-tertiary-100 dark:bg-tertiary-900": open },
                    canClear ? `text-primary-500 border-primary-500` : `text-tertiary-500 border-transparent hover:dark:border-tertiary-900 active:dark:border-tertiary-800`,
                    { "animate-wiggle": canApply && !open }
                )}
            >
                <MdFilterList className="size-5" />
            </button>
            {open && (
                <div
                    ref={filtersRef}
                    className={
                        `sm:absolute fixed w-screen h-screen sm:w-auto sm:h-auto top-0 sm:top-12 sm:max-h-1/2 sm:min-w-[36rem] right-0 z-50 rounded-none border-0 sm:rounded-xl bg-tertiary-50 dark:bg-tertiary-900 flex flex-col transition-colors duration-300 ease-in-out 
                            ${canApply ? "border-primary-500 sm:border-2" : "border-tertiary-300 dark:border-tertiary-700 sm:border"}`
                    }
                >
                    <div
                        className="flex gap-1 justify-between p-4 border-b border-tertiary-300 dark:border-tertiary-700">
                        <div>
                            <div className="text-black dark:text-white font-semibold flex gap-1 items-center">
                                <MdOutlineFilterAlt className="size-4" />
                                Filters
                            </div>
                            <div className="text-tertiary-500 dark:text-tertiary-400 text-sm">
                                Click the buttons next to the fields to change applied operation.
                            </div>
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            className={`p-1 rounded-lg hover:bg-tertiary-100 active:bg-tertiary-200 hover:dark:bg-tertiary-900 active:dark:bg-tertiary-800 sm:hidden flex items-center justify-center transition-colors duration-300 ease-in-out`}>
                            <MdClose className="size-5" />
                        </button>
                    </div>
                    <div className="flex flex-col">
                        <FiltersListGroup title="Metadata">
                            <FiltersInput name="beatmapset_filter.artist" />
                            <FiltersInput name="beatmapset_filter.title" />
                            <FiltersInput name="beatmapset_filter.source" />
                            <FiltersInput name="beatmapset_filter.creator" />
                        </FiltersListGroup>
                    </div>


                    <div className="flex flex-col gap-4 p-4">
                        {canClear && (
                            <button
                                onClick={() => clearFilters()}
                                className="flex items-center gap-1.5 whitespace-nowrap rounded-lg hover:bg-tertiary-200 dark:hover:bg-tertiary-800 text-primary-400 p-2">
                                <MdClose className="size-4" />
                                Clear Filters
                            </button>
                        )}


                        <div className="flex gap-2 items-center self-end sticky bottom-0">
                            <div>
                                <span className="text-tertiary-500 dark:text-tertiary-400">
                                    <strong>{appliedFilters.length}</strong> filter(s) applied.&nbsp;
                                </span>
                                {
                                    canApply && (
                                        <span className="text-tertiary-500 dark:text-tertiary-400">
                                            <strong>{Math.abs(filters.length - appliedFilters.length)}</strong> unsaved change(s).
                                        </span>
                                    )
                                }
                            </div>
                            {canApply && (
                                <>
                                    <button
                                        onClick={() => undoFilters()}
                                        className="flex items-center gap-1.5 whitespace-nowrap self-end rounded-lg hover:bg-tertiary-200 dark:hover:bg-tertiary-800 dark:text-tertiary-400 text-tertiary-500 p-2 px-4">
                                        <MdUndo className="size-4" />
                                        Undo
                                    </button>
                                    <button
                                        onClick={() => applyFilters()}
                                        className="flex items-center whitespace-nowrap self-end rounded-lg bg-primary-500 text-white p-2 px-4">
                                        Apply
                                    </button>
                                </>
                            )}
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default FiltersList;

interface FiltersListGroupProps {
    children: React.ReactNode;
    title: string;
}

const FiltersListGroup: FC<FiltersListGroupProps> = ({ children, title }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col border-b border-tertiary-300 dark:border-tertiary-700">
            <button className="flex items-center justify-between p-4" onClick={() => setOpen(!open)}>
                <div className="text-black dark:text-white font-semibold flex gap-1 items-center">
                    {title}
                </div>
                <div
                    className={`p-1 rounded-lg hover:bg-tertiary-100 active:bg-tertiary-200 hover:dark:bg-tertiary-900 active:dark:bg-tertiary-800`}>
                    {
                        open ? (
                            <MdOutlineKeyboardArrowUp className="size-5" />
                        ) : (
                            <MdOutlineKeyboardArrowDown className="size-5" />
                        )
                    }
                </div>
            </button>
            {open && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 pb-4">
                    {children}
                </div>
            )}
        </div>
    );
};
