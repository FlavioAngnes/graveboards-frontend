'use client'

import {createContext, FC, ReactNode, useContext, useState} from 'react';
import {FilterOptions} from "@/types/beatmapsets/Filters";

interface FiltersContextType {
    filters: FilterOptions<never>[]
    filtersToUse: FilterOptions<never>[]
    putFilter: (filter: FilterOptions<never>) => void;
    removeFilter: (filter: FilterOptions<never>) => void;
    canClear: boolean;
    clearFilters: () => void;
    canApply: boolean;
    applyFilters: () => void;
    undoFilters: () => void;
}

export const FiltersContext = createContext<FiltersContextType>({
    filters: [],
    filtersToUse: [],
    putFilter: () => {},
    removeFilter: () => {},
    canClear: false,
    clearFilters: () => {},
    canApply: false,
    applyFilters: () => {},
    undoFilters: () => {}
})

export const FiltersProvider: FC<{
    children: ReactNode,
    defaultFilters?: FilterOptions<never>[]
}> = ({children, defaultFilters}) => {
    const [filters, setFilters] = useState<FilterOptions<never>[]>([]);
    const [filtersToUse, setFiltersToUse] = useState<FilterOptions<never>[]>(defaultFilters || []);

    const canClear = Object.keys(filters).length > 0;
    const canApply = JSON.stringify(filters) !== JSON.stringify(filtersToUse.filter(layer => !layer.isDefault));

    const putFilter = (filter: FilterOptions<never>) => {
        const updatedFilters = filters.filter(f => f.value !== filter.value);
        setFilters([...updatedFilters, filter]);
    }

    const removeFilter = (filter: FilterOptions<never>) => {
        // Removes the options provided by the filter from the filter options.
        // If the options are empty afterward, the filter is removed.
        const updatedFilters = filters
            .map(({ value, options }) => {
                if (value === filter.value) {
                    const updatedOptions = { ...options };
                    Object.keys(filter.options).forEach((key) => {
                        // @ts-expect-error - TS doesn't know that the key is a valid key of options. see FilterOperators
                        delete updatedOptions[key];
                    });

                    if (Object.keys(updatedOptions).length === 0) {
                        return null;
                    }

                    return { value, options: updatedOptions };
                }

                return { value, options };
            })
            .filter((filter) => filter !== null);
        setFilters(updatedFilters);
    }

    const clearFilters = () => {
        setFilters([]);
    }

    const applyFilters = () => {
        const defaultFilters = filtersToUse.filter(layer => layer.isDefault);
        const updatedLayersToUse = [...defaultFilters, ...filters];
        setFiltersToUse(updatedLayersToUse);
    }

    const undoFilters = () => {
        setFilters(filtersToUse.filter(layer => !layer.isDefault));
    }

    return (
        <FiltersContext.Provider value={{
            filters,
            filtersToUse,
            putFilter,
            removeFilter,
            canClear,
            clearFilters,
            canApply,
            applyFilters,
            undoFilters
        }}>
            {children}
        </FiltersContext.Provider>
    )
}

export const useFilters = () => useContext(FiltersContext);
