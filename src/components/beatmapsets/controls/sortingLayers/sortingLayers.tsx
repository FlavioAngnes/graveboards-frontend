import React, {useEffect, useRef, useState} from 'react';
import {MdAdd, MdClose, MdImportExport, MdUndo} from "react-icons/md";
import SortingLayer from "@/components/beatmapsets/controls/sortingLayers/sortingLayer";
import {Reorder} from 'motion/react';
import {useSorting} from "@/context/beatmapsets/BeatmapsetListSortingContext";
import clsx from "clsx";

const SortingLayers = () => {
    const [open, setOpen] = useState(false);

    const {
        layers,
        nextLayer,
        addLayer,
        removeLayer,
        updateLayer,
        reorderLayers,
        clearLayers,
        undoLayers,
        applyLayers,
        canApply,
        canClear
    } = useSorting();

    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const sortingRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (buttonRef.current && !buttonRef.current.contains(e.target as Node) && sortingRef.current && !sortingRef.current.contains(e.target as Node)) {
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
                    { 'bg-tertiary-100 dark:bg-tertiary-900': open },
                    canClear ? `text-primary-500 border-primary-500` : `text-tertiary-500 border-transparent hover:dark:border-tertiary-900 active:dark:border-tertiary-800`,
                    { 'animate-wiggle': canApply && !open }
                )}
            >
                <MdImportExport className="size-5"/>
            </button>
            {open && (
                    <div
                        ref={sortingRef}
                        className={
                            `sm:absolute fixed w-screen h-screen sm:w-auto sm:h-auto top-0 sm:top-12 right-0 p-4 z-10 rounded-none border-0 sm:rounded-xl bg-tertiary-50 dark:bg-tertiary-900 flex flex-col gap-4 transition-colors duration-300 ease-in-out 
                            ${canApply ? "border-primary-500 sm:border-2" : "border-tertiary-300 dark:border-tertiary-700 sm:border-[1px]"}`
                        }
                    >
                        <div className="flex gap-1 justify-between">
                            <div>
                                <div className="text-black dark:text-white font-semibold flex gap-1 items-center">
                                    <MdImportExport className="size-4"/>
                                    Sorting Layers
                                </div>
                                <div className="text-tertiary-500 dark:text-tertiary-400 text-sm">
                                    Drag and drop to reorder the sorting layers.
                                </div>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className={`p-1 rounded-lg hover:bg-tertiary-100 active:bg-tertiary-200 hover:dark:bg-tertiary-900 active:dark:bg-tertiary-800 sm:hidden flex items-center justify-center transition-colors duration-300 ease-in-out`}>
                                <MdClose className="size-5"/>
                            </button>
                        </div>
                        <div className="flex flex-col gap-4 flex-1">
                            {canClear && (
                                <Reorder.Group as="div" onReorder={reorderLayers}
                                               values={layers.map((layer => layer.value))}
                                               layout={"position"}
                                               className="flex flex-col gap-2">
                                    {layers.map((layer) => (
                                        <SortingLayer values={layers} value={layer} onChange={updateLayer}
                                                      onDestroy={removeLayer} key={layer.value}/>
                                    ))}
                                </Reorder.Group>
                            )}
                            <div className="flex flex-col gap-2">
                                {
                                    nextLayer && (
                                        <button
                                            onClick={() => addLayer()}
                                            className="flex items-center gap-1.5 whitespace-nowrap rounded-lg hover:bg-tertiary-200 dark:hover:bg-tertiary-800 dark:text-tertiary-400 text-tertiary-500 p-2">
                                            <MdAdd className="size-4"/>
                                            Add Sorting Layer
                                        </button>
                                    )
                                }
                                {canClear && (<button
                                    onClick={() => clearLayers()}
                                    className="flex items-center gap-1.5 whitespace-nowrap rounded-lg hover:bg-tertiary-200 dark:hover:bg-tertiary-800 text-primary-400 p-2">
                                    <MdClose className="size-4"/>
                                    Clear Sorting
                                </button>)}
                            </div>
                        </div>
                        {
                            canApply && (
                                <div className="flex gap-2 self-end sticky bottom-0">
                                    <button
                                        onClick={() => undoLayers()}
                                        className="flex items-center gap-1.5 whitespace-nowrap self-end rounded-lg hover:bg-tertiary-200 dark:hover:bg-tertiary-800 dark:text-tertiary-400 text-tertiary-500 p-2 px-4">
                                        <MdUndo className="size-4"/>
                                        Undo
                                    </button>
                                    <button
                                        onClick={() => applyLayers()}
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

export default SortingLayers;
