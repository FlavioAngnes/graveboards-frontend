import React, {FC, useEffect, useRef, useState} from "react";
import {MdArrowDownward, MdArrowUpward, MdOutlineKeyboardArrowDown} from "react-icons/md";
import {Sorting} from "@/types/beatmapsets/sorting";
import clsx from "clsx";
import {Order} from "@/types/sorting";

interface Order {
    icon: React.ReactNode,
    label: string,
    value: Order
}

interface SelectOrderProps {
    values: Sorting[],
    value: Order,
    onChange?: (value: Order) => void
}

const SelectOrder: FC<SelectOrderProps> = ({value, onChange}) => {
    const [open, setOpen] = useState(false);

    const [order, setOrder] = useState<Order>(value);

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

    const handleChange = (value: Order) => {
        setOrder(value);

        if (onChange) {
            onChange(value);
        }

        setOpen(false);
    }

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
                    {order === 'asc' ? <MdArrowUpward className="size-4"/> : <MdArrowDownward className="size-4"/>}
                    {order === 'asc' ? 'Ascending' : 'Descending'}
                </div>

                <MdOutlineKeyboardArrowDown className="size-5"/>
            </button>
            {open && (
                <div
                    className="sm:absolute overflow-hidden sm:overflow-visible sm:mt-2 flex flex-col z-10 bg-tertiary-100 dark:bg-tertiary-900 sm:border-[1px] border-tertiary-500 rounded-b-lg sm:rounded-lg min-w-full max-h-[19.25rem] snap-y">
                    <SelectSortingOrderItem
                        order={{
                            icon: <MdArrowUpward className="size-4"/>,
                            label: 'Ascending',
                            value: 'asc'
                        }}
                        setOrder={handleChange}
                    />
                    <SelectSortingOrderItem
                        order={{
                            icon: <MdArrowDownward className="size-4"/>,
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
    setOrder: (order: Order) => void;
}

const SelectSortingOrderItem: FC<SelectSortingOrderItemProps> = ({order, setOrder}) => {
    return (
        <button
            className="text-tertiary-500 dark:text-tertiary-400 whitespace-nowrap p-2 flex-1 flex gap-1.5 items-center hover:bg-tertiary-100 active:bg-tertiary-200 active:text-black dark:hover:bg-tertiary-800 active:dark:bg-tertiary-700 active:dark:text-white transition-colors duration-300 ease-in-out"
            key={order.value}
            onClick={() => setOrder(order.value)}
        >
            {order.icon}
            {order.label}
        </button>
    )
}

export default SelectOrder;
