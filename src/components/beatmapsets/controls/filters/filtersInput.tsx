import React, {FC} from 'react';
import {FilterOperators, FiltersMap, FilterValue} from "@/types/beatmapsets/Filters";
import {useFilters} from "@/context/beatmapsets/FiltersContext";

interface FiltersInputProps {
    name: FilterValue;
    allowedOperators?: FilterOperators[];
}

const FiltersInput: FC<FiltersInputProps> = ({
                                                 name,
                                                 allowedOperators = ['eq', 'neq']
                                             }) => {

    const {filters, putFilter, removeFilter} = useFilters();

    const initialFilter = filters.find(f => f.value === name);

    const initialValue = initialFilter ? Object.values(initialFilter.options)[0] : '';
    const initialOperator = initialFilter ? Object.keys(initialFilter.options)[0] as FilterOperators : 'eq';

    const [operator, setOperator] = React.useState<FilterOperators>(initialOperator);

    return (
        <div className="flex flex-col gap-1">
            <div className="flex gap-1.5 items-center font-semibold dark:text-white">
                <div className="size-5 text-xl flex items-center justify-center">
                    {FiltersMap[name].icon}
                </div>
                {FiltersMap[name].label}
            </div>
            <div className="flex items-center gap-2">
                <button
                    className={
                        `size-10 p-2 active:text-black active:dark:text-white rounded-lg hover:bg-tertiary-100 active:bg-tertiary-200 dark:hover:bg-tertiary-800 active:dark:bg-tertiary-700 text-tertiary-400 flex items-center justify-center text-xl gap-1 transition-colors duration-300 ease-in-out`
                    }
                    onClick={() => setOperator(allowedOperators[(allowedOperators.indexOf(operator) + 1) % allowedOperators.length])}>
                    {operator === 'eq' ? '=' : operator === 'neq' ? '≠' : operator === 'gt' ? '>' : operator === 'lt' ? '<' : operator === 'gte' ? '≥' : '≤'}
                </button>
                <input
                    className=
                        'w-full sm:w-auto placeholder-tertiary-500 dark:placeholder-tertiary-400 whitespace-nowrap p-2 rounded-lg dark:bg-tertiary-900 outline-none border-[1px] flex items-center justify-between gap-1 transition-colors duration-300 ease-in-out focus:border-primary-500 focus:bg-tertiary-100 focus:dark:bg-tertiary-800 border-tertiary-300 dark:border-tertiary-700'

                    name={name}
                    type="text"
                    placeholder={FiltersMap[name].label}
                    defaultValue={initialValue}
                    onChange={(e) => {
                        if (e.target.value.length === 0) {
                            removeFilter({
                                value: name,
                                options: {
                                    [operator]: e.target.value
                                }
                            });

                            return;
                        }

                        putFilter(
                            {
                                value: name,
                                options: {
                                    [operator]: e.target.value
                                }
                            }
                        )
                    }}/>
            </div>
        </div>
    );
};

export default FiltersInput;
