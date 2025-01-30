'use client'

import {createContext, FC, ReactNode, useContext, useState} from 'react';
import {BeatmapsetListFilterOptions} from "@/types/beatmapsets/filters";

interface FiltersContextType {
    filters: BeatmapsetListFilterOptions<unknown>[];
    userFilters: BeatmapsetListFilterOptions<unknown>[];
    filtersToUse: BeatmapsetListFilterOptions<unknown>[];
    putFilter: (filter: BeatmapsetListFilterOptions<unknown>) => void;
    removeFilter: (filter: BeatmapsetListFilterOptions<unknown>) => void;
    canClear: boolean;
    clearFilters: () => void;
    canApply: boolean;
    applyFilters: () => void;
    undoFilters: () => void;
}

export const FiltersContext = createContext<FiltersContextType>({
    filters: [],
    userFilters: [],
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
    defaultFilters?: BeatmapsetListFilterOptions<unknown>[]
}> = ({children, defaultFilters}) => {
    const [filters, setFilters] = useState<BeatmapsetListFilterOptions<unknown>[]>([]);
    const [userFilters, setUserFilters] = useState<BeatmapsetListFilterOptions<unknown>[]>([]);
    const [filtersToUse, setFiltersToUse] = useState<BeatmapsetListFilterOptions<unknown>[]>(defaultFilters || []);

    const canClear = Object.keys(filters).length > 0;
    const canApply = JSON.stringify(filters) !== JSON.stringify(filtersToUse.filter(layer => !layer.isDefault));

    const putFilter = (filter: BeatmapsetListFilterOptions<unknown>) => {
        const updatedFilters = filters.filter(f => f.value !== filter.value);
        setFilters([...updatedFilters, filter]);
    }

    const removeFilter = (filter: BeatmapsetListFilterOptions<unknown>) => {
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

        const defaultFilters = filtersToUse.filter(layer => layer.isDefault);
        const updatedLayersToUse = [...defaultFilters, ...updatedFilters];
        setUserFilters(updatedFilters);
        setFiltersToUse(updatedLayersToUse);
    }

    const clearFilters = () => {
        setFilters([]);
        setUserFilters([]);
    }

    const applyFilters = () => {
        const defaultFilters = filtersToUse.filter(layer => layer.isDefault);
        const updatedLayersToUse = [...defaultFilters, ...filters];
        setUserFilters(filters);
        setFiltersToUse(updatedLayersToUse);
    }

    const undoFilters = () => {
        setFilters(filtersToUse.filter(layer => !layer.isDefault));
    }

    return (
        <FiltersContext.Provider value={{
            filters,
            userFilters,
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
