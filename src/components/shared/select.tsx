import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { MdCheck, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import cn from "@/utils/cn";

interface SelectProps<T> extends HTMLAttributes<HTMLDivElement> {
    items: T[];
    onItemSelect: (selectedItem: T | null) => void;
    renderItem: (item: T) => React.ReactNode;
    renderSelected?: (item: T) => React.ReactNode;
    isSelected: (item: T) => boolean;
    selected?: T | T[] | null;
    placeholder?: string;
    disabled?: boolean;
    footer?: React.ReactNode;
}

const Select = <T, >({
                         items,
                         onItemSelect,
                         isSelected,
                         renderItem,
                         renderSelected,
                         selected,
                         placeholder,
                         className,
                         disabled,
                         footer,
                         ...props
                     }: SelectProps<T>) => {
    const [open, setOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleSelect = (item: T) => {
        onItemSelect(item);
        setOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={dropdownRef}
            className={cn(
                className,
                `border-transparent relative transition-colors duration-300 ease-in-out sm:border-0 sm:rounded-none border-[1px] rounded-lg`,
                { "sm:border-primary-500": open }
            )}
            {...props}
        >
            <button
                disabled={disabled}
                type="button"
                className={clsx(
                    `${className} whitespace-nowrap p-2 sm:rounded-lg backdrop-blur border-[1px] enabled:hover:bg-tertiary-100 enabled:active:bg-tertiary-200 enabled:dark:hover:bg-tertiary-800 enabled:dark:active:bg-tertiary-700 disabled:opacity-50 flex items-center justify-between gap-1 transition-colors duration-300 ease-in-out`,
                    open ? "border-primary-500 bg-tertiary-100 dark:bg-tertiary-800 rounded-t-lg" : "border-tertiary-300 dark:border-tertiary-700 rounded-lg"
                )}
                onClick={() => setOpen(!open)}>
                <div className="flex items-center gap-1 w-full flex-wrap">
                    {
                        selected instanceof Array ? (
                            selected.length > 0 ? selected.map((item, index) => (
                                <div key={index} className="flex items-center gap-1.5">
                                    {renderSelected ? renderSelected(item) : renderItem(item)}
                                </div>
                            )) : (
                                <p className={clsx(open ? "text-black dark:text-white" : "text-tertiary-400", "transition-colors duration-300 ease-in-out")}>{placeholder || "Select Item(s)"}</p>
                            )
                        ) : (selected !== null && selected !== undefined) ? (
                            renderSelected ? renderSelected(selected) : renderItem(selected)
                        ) : (
                            <p className={clsx(open ? "text-black dark:text-white" : "text-tertiary-400", "transition-colors duration-300 ease-in-out")}>{placeholder || "Select Item"}</p>
                        )
                    }
                </div>

                {
                    open ? (
                        <MdOutlineKeyboardArrowUp className="size-5" />
                    ) : (
                        <MdOutlineKeyboardArrowDown className="size-5" />
                    )
                }
            </button>
            {open && (
                <div
                    className="absolute overflow-hidden sm:mt-2 flex flex-col z-50 bg-tertiary-100 dark:bg-tertiary-900 sm:border-[1px] border-t-0 sm:border-t-[1px] border-tertiary-400 dark:border-tertiary-700 border-[1px] rounded-b-lg sm:rounded-lg min-w-full max-h-[19.25rem] snap-y">
                    {items.map((item, index) => (
                        <div key={index} onClick={() => handleSelect(item)} className={
                            clsx(
                                isSelected(item) ? "bg-tertiary-200 dark:bg-tertiary-800 text-black dark:text-white" : "text-tertiary-500 dark:text-tertiary-400",
                                "cursor-pointer whitespace-nowrap p-2 flex-1 flex gap-1.5 items-center justify-between hover:bg-tertiary-200 active:bg-tertiary-300 active:text-black dark:hover:bg-tertiary-800 active:dark:bg-tertiary-700 active:dark:text-white transition-colors duration-300 ease-in-out"
                            )
                        }>
                            {renderItem(item)}
                            {isSelected(item) && (
                                <div
                                    className="flex items-center justify-center text-black dark:text-white rounded-full w-6 h-6">
                                    <MdCheck />
                                </div>
                            )}
                        </div>
                    ))}

                    {footer}
                </div>
            )}
        </div>
    );
};

export default Select;
