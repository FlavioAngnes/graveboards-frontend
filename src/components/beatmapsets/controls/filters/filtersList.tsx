import React, {useEffect} from 'react';
import {useFilters} from "@/context/beatmapsets/BeatmapsetListFiltersContext";
import {MdClose, MdFilterList, MdOutlineFilterAlt, MdUndo} from "react-icons/md";
import clsx from "clsx";
import FiltersInput from "@/components/beatmapsets/controls/filters/filtersInput";

const FiltersList = () => {
    const [open, setOpen] = React.useState(false);

    const {canApply, canClear, clearFilters, undoFilters, applyFilters} = useFilters();

    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    const filtersRef = React.useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (buttonRef.current && !buttonRef.current.contains(e.target as Node) && filtersRef.current && !filtersRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);


    return (
        <>
            <button
                ref={buttonRef}
                onClick={() => setOpen(!open)}
                className={clsx(
                    `p-1 size-9 rounded-lg hover:bg-tertiary-100 active:bg-tertiary-200 hover:dark:bg-tertiary-900 active:dark:bg-tertiary-800 flex items-center border-2 justify-center transition-colors duration-300 ease-in-out`,
                    {'bg-tertiary-100 dark:bg-tertiary-900': open},
                    canClear ? `text-primary-500 border-primary-500` : `text-tertiary-500 border-transparent hover:dark:border-tertiary-900 active:dark:border-tertiary-800`,
                    {'animate-wiggle': canApply && !open}
                )}
            >
                <MdFilterList className="size-5"/>
            </button>
            {open && (
                <div
                    ref={filtersRef}
                    className={
                        `sm:absolute fixed w-screen h-screen sm:w-auto sm:h-auto top-0 sm:top-12 right-0 p-4 z-50 rounded-none border-0 sm:rounded-xl bg-tertiary-50 dark:bg-tertiary-900 flex flex-col gap-4 transition-colors duration-300 ease-in-out 
                            ${canApply ? "border-primary-500 sm:border-2" : "border-tertiary-300 dark:border-tertiary-700 sm:border-[1px]"}`
                    }
                >
                    <div className="flex gap-1 justify-between">
                        <div>
                            <div className="text-black dark:text-white font-semibold flex gap-1 items-center">
                                <MdOutlineFilterAlt className="size-4"/>
                                Filters
                            </div>
                            <div className="text-tertiary-500 dark:text-tertiary-400 text-sm">
                                Click the buttons next to the fields to change applied operation.
                            </div>
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            className={`p-1 rounded-lg hover:bg-tertiary-100 active:bg-tertiary-200 hover:dark:bg-tertiary-900 active:dark:bg-tertiary-800 sm:hidden flex items-center justify-center transition-colors duration-300 ease-in-out`}>
                            <MdClose className="size-5"/>
                        </button>
                    </div>
                    <div className="flex flex-col gap-4">
                        <FiltersInput name="beatmapset_filter.artist"/>
                        <FiltersInput name="beatmapset_filter.title"/>
                        <FiltersInput name="beatmapset_filter.creator"/>
                    </div>

                    {canClear && (<button
                        onClick={() => clearFilters()}
                        className="flex items-center gap-1.5 whitespace-nowrap rounded-lg hover:bg-tertiary-200 dark:hover:bg-tertiary-800 text-primary-400 p-2">
                        <MdClose className="size-4"/>
                        Clear Filters
                    </button>)}

                    {
                        canApply && (
                            <div className="flex gap-2 self-end sticky bottom-0">
                                <button
                                    onClick={() => undoFilters()}
                                    className="flex items-center gap-1.5 whitespace-nowrap self-end rounded-lg hover:bg-tertiary-200 dark:hover:bg-tertiary-800 dark:text-tertiary-400 text-tertiary-500 p-2 px-4">
                                    <MdUndo className="size-4"/>
                                    Undo
                                </button>
                                <button
                                    onClick={() => applyFilters()}
                                    className="flex items-center whitespace-nowrap self-end rounded-lg bg-primary-500 text-white p-2 px-4">
                                    Apply
                                </button>
                            </div>

                        )
                    }
                </div>
            )}
        </>
    );
};

export default FiltersList;
