import React, {FC, useEffect, useRef, useState} from "react";
import {MdArrowDownward, MdArrowUpward, MdOutlineKeyboardArrowDown} from "react-icons/md";
import {SortingLayerOptions, SortingLayerOrders} from "@/types/beatmapsets/Sorting";

interface Order {
    icon: React.ReactNode,
    label: string,
    value: SortingLayerOrders
}

interface SelectOrderProps {
    values: SortingLayerOptions[],
    value: SortingLayerOrders,
    onChange?: (value: SortingLayerOrders) => void
}

const SelectOrder: FC<SelectOrderProps> = ({value, onChange}) => {
    const [open, setOpen] = useState(false);

    const [order, setOrder] = useState<SortingLayerOrders>(value);

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

    const handleChange = (value: SortingLayerOrders) => {
        setOrder(value);

        if (onChange) {
            onChange(value);
        }

        setOpen(false);
    }

    return (
        <div ref={dropdownRef} className="relative">
            <button
                className={
                    `whitespace-nowrap p-2 rounded-lg backdrop-blur hover:bg-tertiary-100 active:bg-tertiary-200 dark:hover:bg-tertiary-800 border-[1px] flex items-center gap-1 transition-colors duration-300 ease-in-out
                    ${open ? 'border-primary-500 bg-tertiary-100 dark:bg-tertiary-800' : 'border-tertiary-300 dark:border-tertiary-700'}`
                }
                onClick={() => setOpen(!open)}>
                {order === 'asc' ? <MdArrowUpward className="size-5"/> : <MdArrowDownward className="size-5"/>}
                {order === 'asc' ? 'Ascending' : 'Descending'}
                <MdOutlineKeyboardArrowDown className="size-5"/>
            </button>
            {open && (
                <div
                    className="absolute mt-2 flex flex-col z-10 bg-tertiary-50 dark:bg-tertiary-900 rounded-lg border-[1px] border-tertiary-500 dark:border-tertiary-700 min-w-full max-h-[50vh] overflow-y-scroll">
                    <SelectSortingOrderItem
                        order={{
                            icon: <MdArrowUpward className="size-5"/>,
                            label: 'Ascending',
                            value: 'asc'
                        }}
                        setOrder={handleChange}
                    />
                    <SelectSortingOrderItem
                        order={{
                            icon: <MdArrowDownward className="size-5"/>,
                            label: 'Descending',
                            value: 'desc'
                        }}
                        setOrder={handleChange}
                    />
                </div>

            )}
        </div>
    );
};

interface SelectSortingOrderItemProps {
    order: Order;
    setOrder: (order: SortingLayerOrders) => void;
}

const SelectSortingOrderItem: FC<SelectSortingOrderItemProps> = ({order, setOrder}) => {
    return (
        <button
            className={`text-tertiary-500 dark:text-tertiary-400 whitespace-nowrap p-2.5 flex-1 flex items-center hover:bg-tertiary-100 active:bg-tertiary-200 active:text-black dark:hover:bg-tertiary-800 active:dark:bg-tertiary-700 active:dark:text-white transition-colors duration-300 ease-in-out`}
            key={order.value}
            onClick={() => setOrder(order.value)}
        >
            {order.icon}
            {order.label}
        </button>
    )
}

export default SelectOrder;
