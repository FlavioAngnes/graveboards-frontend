import React, {FC, useState} from 'react';
import {MdClose, MdDragIndicator} from "react-icons/md";
import {
    SortingLayerOptions,
    SortingLayerOrders,
    SortingLayerValue
} from "@/types/beatmapsets/Sorting";
import SelectValue
    from "@/components/beatmapsets/controls/sortingLayers/selectValue";
import SelectOrder
    from "@/components/beatmapsets/controls/sortingLayers/selectOrder";

interface SortingLayerProps {
    values: SortingLayerOptions[],
    value: SortingLayerOptions,
    onChange?: (newValue: SortingLayerOptions, index: number) => void,
    onDestroy?: (index: number) => void,
}

const SortingLayer: FC<SortingLayerProps> = ({values, value, onChange, onDestroy}) => {
    const [sorting, setSorting] = useState<SortingLayerOptions>(value);

    const handleValueChange = (value: SortingLayerValue) => {
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

    return (
        <div className="flex items-center gap-2">
            <MdDragIndicator
                className="cursor-grab active:cursor-grabbing size-5 dark:text-tertiary-400 text-tertiary-500"/>
            <SelectValue values={values} value={value.value} onChange={handleValueChange}/>
            <SelectOrder values={values} value={value.order} onChange={handleOrderChange}/>
            <div className="flex-1 -mr-2"></div>
            <button
                onClick={() => handleDestroy()}
                className="rounded-lg hover:bg-tertiary-200 dark:hover:bg-tertiary-800 dark:text-tertiary-400 text-tertiary-500 p-2">
                <MdClose className="size-4"/>
            </button>
        </div>
    );
};

export default SortingLayer;
