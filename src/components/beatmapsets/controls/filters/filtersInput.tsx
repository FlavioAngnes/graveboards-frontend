import React, { FC, ReactNode } from "react";
import { FilterValue } from "@/types/beatmapsets/filters";
import { useFilters } from "@/context/beatmapsets/FiltersContext";
import { FilterOperators } from "@/types/filters";
import { BeatmapsetListFiltersMap } from "@/data/beatmapsets/filters";
import { getOperatorSymbol } from "@/utils/operators";

interface FiltersInputProps {
    name: FilterValue;
    allowedOperators?: FilterOperators[];
    showTitle?: boolean;
    title?: ReactNode;
    placeholder?: string;
    showPlaceholder?: boolean;
}

const FiltersInput: FC<FiltersInputProps> = ({
                                                 name,
                                                 allowedOperators = ["eq", "neq"],
                                                 showTitle = true,
                                                 title,
                                                 placeholder,
                                                 showPlaceholder = true
                                             }) => {

    const { filters, addFilter, removeFilter } = useFilters();

    const initialFilter = filters.find(f => f.value === name);

    const initialValue = initialFilter ? Object.values(initialFilter.options)[0] : "";
    const initialOperator = initialFilter ? Object.keys(initialFilter.options)[0] as FilterOperators : allowedOperators[0];

    const [value, setValue] = React.useState<string>(initialValue);
    const [operator, setOperator] = React.useState<FilterOperators>(initialOperator);

    const handleOperatorChange = () => {
        const newOperator = allowedOperators[(allowedOperators.indexOf(operator) + 1) % allowedOperators.length];

        setOperator(newOperator);

        if (value.length === 0) {
            return;
        }

        addFilter(name, { [newOperator]: value }, true);
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        setValue(newValue);

        if (newValue.length === 0) {
            removeFilter(name);
            return;
        }

        addFilter(name, { [operator]: newValue }, true);
    };

    return (
        <div className="flex flex-col gap-2">
            {
                showTitle && (
                    <div className="flex gap-1.5 items-center font-semibold dark:text-white">
                        {title ? title : (
                            <>
                                <div className="size-5 text-xl flex items-center justify-center">
                                    {BeatmapsetListFiltersMap[name].icon}
                                </div>
                                {BeatmapsetListFiltersMap[name].label}
                            </>
                        )}
                    </div>
                )
            }
            <div className="flex items-center gap-2">
                <button
                    className={
                        `size-10 p-2 active:text-black active:dark:text-white rounded-lg hover:bg-tertiary-100 active:bg-tertiary-200 dark:hover:bg-tertiary-800 active:dark:bg-tertiary-700 text-tertiary-400 flex items-center justify-center text-xl gap-1 transition-colors duration-300 ease-in-out`
                    }
                    onClick={handleOperatorChange}>
                    {getOperatorSymbol(operator)}
                </button>
                <input
                    className=
                        "w-full placeholder-tertiary-500 dark:placeholder-tertiary-400 whitespace-nowrap p-2 rounded-lg dark:bg-tertiary-900 outline-none border flex items-center justify-between gap-1 transition-colors duration-300 ease-in-out focus:border-primary-500 focus:bg-tertiary-100 focus:dark:bg-tertiary-800 border-tertiary-300 dark:border-tertiary-700"
                    name={name}
                    type="text"
                    placeholder={showPlaceholder ? placeholder ? placeholder : BeatmapsetListFiltersMap[name].label : ""}
                    value={value}
                    onChange={handleValueChange} />
            </div>
        </div>
    );
};

export default FiltersInput;
