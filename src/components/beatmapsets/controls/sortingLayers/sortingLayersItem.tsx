import React, { FC, useState } from "react";
import { MdArrowDownward, MdArrowUpward, MdClose, MdDragIndicator } from "react-icons/md";
import { BeatmapsetListSortingLayer, BeatmapsetListSortingLayerValue } from "@/types/beatmapsets/sorting";
import SelectValue from "@/components/beatmapsets/controls/sortingLayers/selectValue";
import { Reorder, useDragControls } from "motion/react";
import { SortingLayerOrders } from "@/types/sorting";
import Select from "@/components/shared/select";
import clsx from "clsx";

interface SortingLayerProps {
    values: BeatmapsetListSortingLayer[],
    value: BeatmapsetListSortingLayer,
    onChange?: (newValue: BeatmapsetListSortingLayer, index: number) => void,
    onDestroy?: (index: number) => void,
    containerRef?: React.RefObject<HTMLDivElement>
}

interface OrderItem {
    value: SortingLayerOrders,
    label: string,
    icon: React.ReactNode
}

const orders: OrderItem[] = [{
    value: "asc",
    label: "Ascending",
    icon: <MdArrowUpward className="size-4" />
}, {
    value: "desc",
    label: "Descending",
    icon: <MdArrowDownward className="size-4" />
}];

const SortingLayersItem: FC<SortingLayerProps> = ({ values, value, onChange, onDestroy, containerRef }) => {
    const [sorting, setSorting] = useState<BeatmapsetListSortingLayer>(value);

    const handleValueSelect = (value: BeatmapsetListSortingLayerValue) => {
        setSorting((prev) => {
            if (prev) {
                return {
                    ...prev,
                    value
                };
            }
            return prev;
        });

        if (onChange) {
            onChange({
                ...sorting,
                value
            }, values.indexOf(sorting));
        }
    };

    const handleOrderSelect = (order: SortingLayerOrders) => {
        setSorting((prev) => {
            if (prev) {
                return {
                    ...prev,
                    order
                };
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

    const handleRemove = () => {
        if (onDestroy) {
            onDestroy(values.findIndex((layer) => layer.value === sorting.value));
        }
    };

    const controls = useDragControls();

    return (
        <Reorder.Item
            as="div"
            value={value.value}
            dragListener={false}
            dragControls={controls}
            dragConstraints={containerRef}
            dragElastic={0}
            className={clsx("flex items-center gap-2 rounded-lg h-24 sm:h-[2.625rem] w-full sm:w-[600px]")}
        >
            <MdDragIndicator
                onPointerDown={(e) => {
                    e.preventDefault();
                    controls.start(e);
                }}
                className="cursor-grab active:cursor-grabbing size-5 dark:text-tertiary-400 text-tertiary-500 shrink-0" />
            <div className="flex gap-2 sm:flex-row flex-col grow">
                <SelectValue
                    items={values.map((layer) => layer.value)}
                    selectedItem={value.value}
                    onSelect={handleValueSelect}
                />
                <Select
                    items={orders}
                    renderItem={(item) => (
                        <div className="flex items-center gap-1">
                            {item.icon}
                            <p>{item.label}</p>
                        </div>
                    )}
                    onItemSelect={(item) => handleOrderSelect(item?.value || "asc")}
                    selectedItem={orders.find((order) => order.value === sorting.order)}
                    isSelected={(item) => item.value === sorting.order}
                    className={"w-full sm:w-auto"}
                />
            </div>
            <button
                onClick={handleRemove}
                className="rounded-lg hover:bg-tertiary-200 dark:hover:bg-tertiary-800 dark:text-tertiary-400 text-tertiary-500 p-2">
                <MdClose className="size-4" />
            </button>
        </Reorder.Item>
    );
};

export default SortingLayersItem;
