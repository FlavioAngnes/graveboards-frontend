import React, {FC} from 'react';
import {GoX} from "react-icons/go";
import {FilterValue} from "@/types/beatmapsets/filters";
import {useFilters} from "@/context/beatmapsets/FiltersContext";
import {FilterOperators} from "@/types/filters";
import clsx from "clsx";
import { getOperatorSymbol } from "@/utils/operators";

interface FilterChipProps {
    name: FilterValue;
    label: string;
    option: {
        operation: FilterOperators;
        value: string;
    };
}

const FilterChip: FC<FilterChipProps> = ({name, label, option}) => {
    const key =  getOperatorSymbol(option.operation);

    const {removeFilter, appliedFilters} = useFilters();

    const filterInUse = appliedFilters.some(filter => filter.value === name && Object.keys(filter.options).some((o) => o === option.operation));

    return (
        <div className={clsx("flex rounded-full overflow-hidden text-sm tracking-wide", {"opacity-50" : !filterInUse})}>
            <div
                className="py-0.5 pl-2.5 pr-1.5 bg-primary-200 rounded-l-full dark:bg-transparent dark:border-primary-500 dark:border dark:text-primary-500 text-black">
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
                onClick={() => removeFilter(name)}
                className="flex cursor-pointer items-center py-0.5 pr-1.5 bg-primary-500 text-white">
                <GoX/>
            </div>
        </div>
    );
};

export default FilterChip;
