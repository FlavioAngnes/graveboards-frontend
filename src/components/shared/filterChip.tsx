import React, {FC} from 'react';
import {GoX} from "react-icons/go";
import {FilterOperators, FilterValue} from "@/types/beatmapsets/Filters";
import {useFilters} from "@/context/beatmapsets/FiltersContext";

interface FilterChipProps {
    name: FilterValue;
    label: string;
    option: {
        operation: FilterOperators;
        value: string;
    };
}

const FilterChip: FC<FilterChipProps> = ({name, label, option}) => {
    let key = option.operation as string;

    if (key === "gt") {
        key = ">";
    } else if (key === "lt") {
        key = "<";
    } else if (key === "gte") {
        key = "≥";
    } else if (key === "lte") {
        key = "≤";
    } else if (key === "neq") {
        key = "≠";
    }

    const {removeFilter} = useFilters();

    return (
        <div className="flex rounded-full overflow-hidden text-sm tracking-wide">
            <div
                className="py-0.5 pl-2.5 pr-1.5 bg-primary-200 rounded-l-full dark:bg-transparent dark:border-primary-500 dark:border-[1px] dark:text-primary-500 text-black">
                {label}
            </div>
            <div className="flex">
                {
                    key !== "eq" && (
                        <div
                            className="py-0.5 px-1.5 bg-primary-300 dark:bg-primary-500 font-semibold dark:text-white text-black">
                            {key}
                        </div>
                    )

                }
                <div className="py-0.5 px-1.5 bg-primary-500 text-white">
                    {option.value}
                </div>
            </div>
            <div
                onClick={() => removeFilter({value: name, options: {[option.operation]: option.value}})}
                className="flex items-center py-0.5 pr-1.5 bg-primary-500 text-white">
                <GoX/>
            </div>
        </div>
    );
};

export default FilterChip;
