import React, { FC, useState } from "react";
import { MdArrowDownward, MdArrowUpward, MdClose, MdDragIndicator } from "react-icons/md";
import { Sorting, SortingValue } from "@/types/beatmapsets/sorting";
import SelectValue from "@/components/beatmapsets/controls/sortingLayers/selectValue";
import { Reorder, useDragControls } from "motion/react";
import { Order } from "@/types/sorting";
import Select from "@/components/shared/select";
import { useSorting } from "@/context/beatmapsets/SortingContext";

interface SortingLayerProps {
    values: Sorting[],
    value: Sorting,
    containerRef?: React.RefObject<HTMLDivElement>
}

interface OrderItem {
    value: Order,
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

const SortingLayerListItem: FC<SortingLayerProps> = ({ values, value, containerRef }) => {
    const [sorting, setSorting] = useState<Sorting>(value);

    const { removeLayer, updateLayerOrder, updateLayerValue } = useSorting();

    const handleValueSelect = (value: SortingValue) => {
        updateLayerValue(sorting.value, value);

        setSorting({
            ...sorting,
            value
        });
    }

    const handleOrderSelect = (order: Order) => {
        updateLayerOrder(sorting.value, order);

        setSorting({
            ...sorting,
            order
        });
    }

    const handleRemove = () => removeLayer(sorting.value);

    const controls = useDragControls();

    return (
        <Reorder.Item
            as="div"
            value={value.value}
            dragListener={false}
            dragControls={controls}
            dragConstraints={containerRef}
            dragElastic={0}
            className="flex items-center gap-2 rounded-lg h-24 sm:h-[2.625rem] w-full sm:w-[600px]"
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
                    onItemSelect={(item) => handleOrderSelect(item!.value)}
                    selected={orders.find((order) => order.value === sorting.order)}
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

export default SortingLayerListItem;
