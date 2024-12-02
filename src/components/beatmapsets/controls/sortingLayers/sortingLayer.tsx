import React, {FC, useState} from 'react';
import {MdClose, MdDragIndicator} from "react-icons/md";
import {
    BeatmapsetListSortingLayerOptions,
    BeatmapsetListSortingLayerValue
} from "@/types/beatmapsets/sorting";
import SelectValue
    from "@/components/beatmapsets/controls/sortingLayers/selectValue";
import SelectOrder
    from "@/components/beatmapsets/controls/sortingLayers/selectOrder";
import {Reorder, useDragControls} from 'motion/react';
import {SortingLayerOrders} from "@/types/sorting";

interface SortingLayerProps {
    values: BeatmapsetListSortingLayerOptions[],
    value: BeatmapsetListSortingLayerOptions,
    onChange?: (newValue: BeatmapsetListSortingLayerOptions, index: number) => void,
    onDestroy?: (index: number) => void,
}

const SortingLayer: FC<SortingLayerProps> = ({values, value, onChange, onDestroy}) => {
    const [sorting, setSorting] = useState<BeatmapsetListSortingLayerOptions>(value);

    const handleValueChange = (value: BeatmapsetListSortingLayerValue) => {
        setSorting((prev) => {
            if (prev) {
                return {
                    ...prev,
                    value
                }
            }
            return prev;
        });

        if (onChange) {
            onChange({
                ...sorting,
                value
            }, values.indexOf(sorting));
        }
    }

    const handleOrderChange = (order: SortingLayerOrders) => {
        setSorting((prev) => {
            if (prev) {
                return {
                    ...prev,
                    order
                }
            }
            return prev;
        });

        if (onChange) {
            onChange({
                ...sorting,
                order
            }, values.indexOf(sorting));
        }
    }

    const handleDestroy = () => {
        if (onDestroy) {
            onDestroy(values.findIndex((layer) => layer.value === sorting.value));
        }
    }

    const controls = useDragControls();

    return (
        <Reorder.Item
            as="div"
            value={value.value}
            dragListener={false}
            dragControls={controls}
            className="flex items-center gap-2 backdrop-blur sm:backdrop-blur-none rounded-lg"
        >
            <MdDragIndicator
                onPointerDown={(e) => controls.start(e)}
                className="cursor-grab active:cursor-grabbing size-5 dark:text-tertiary-400 text-tertiary-500 shrink-0"/>
            <div className="flex gap-2 sm:flex-row flex-col grow">
                <SelectValue values={values} value={value.value} onChange={handleValueChange}/>
                <SelectOrder values={values} value={value.order} onChange={handleOrderChange}/>
            </div>
            <button
                onClick={() => handleDestroy()}
                className="rounded-lg hover:bg-tertiary-200 dark:hover:bg-tertiary-800 dark:text-tertiary-400 text-tertiary-500 p-2">
                <MdClose className="size-4"/>
            </button>
        </Reorder.Item>
    );
};

export default SortingLayer;
