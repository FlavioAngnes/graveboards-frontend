"use client";

import { createContext, FC, ReactNode, useContext, useState } from "react";
import { FilterOptions, FilterValue } from "@/types/beatmapsets/filters";
import { FilterType } from "@/types/filters";

interface FiltersContextType {
    filters: FilterOptions<unknown>[];
    appliedFilters: FilterOptions<unknown>[];
    addFilter: <T = unknown,>(value: FilterValue, options: FilterType<T>) => void;
    removeFilter: (filter: FilterValue) => void;
    canClear: boolean;
    clearFilters: () => void;
    canApply: boolean;
    applyFilters: () => void;
    undoFilters: () => void;
}

export const FiltersContext = createContext<FiltersContextType>({
    filters: [],
    appliedFilters: [],
    addFilter: () => {},
    removeFilter: () => {},
    canClear: false,
    clearFilters: () => {},
    canApply: false,
    applyFilters: () => {},
    undoFilters: () => {}
});

export const FiltersProvider: FC<{
    children: ReactNode,
    defaultFilters?: FilterOptions<unknown>[]
}> = ({ children, defaultFilters }) => {
    // The filters that are on the list but don't apply to the query. Any mutations have to be made to this list.
    const [filters, setFilters] = useState<FilterOptions<unknown>[]>(defaultFilters || []);
    // The filters that are applied to the query.
    const [appliedFilters, setAppliedFilters] = useState<FilterOptions<unknown>[]>(filters);

    const canClear = Object.keys(filters).length > 0;
    const canApply = JSON.stringify(filters.filter(f => !f.isDefault)) !== JSON.stringify(appliedFilters.filter(f => !f.isDefault));

    const addFilter = <T = unknown,>(value: FilterValue, options: FilterType<T>) => {
        if (filters.some(f => f.value === value)) {
            updateFilter(value, options);
        } else {
            setFilters([...filters, {
                value,
                options
            }]);
        }
    };

    const updateFilter = <T = unknown,>(value: FilterValue, options: FilterType<T>) => {
        setFilters(filters.map(f => f.value === value ? {
            ...f,
            options
        } : f));
    };

    const removeFilter = (value: FilterValue) => {
        setFilters(filters.filter(f => f.value !== value));
    };

    const clearFilters = () => setFilters([]);

    const applyFilters = () => setAppliedFilters(filters);

    const undoFilters = () => setFilters(appliedFilters);

    return (
        <FiltersContext.Provider value={{
            filters,
            appliedFilters,
            addFilter,
            removeFilter,
            canClear,
            clearFilters,
            canApply,
            applyFilters,
            undoFilters
        }}>
            {children}
        </FiltersContext.Provider>
    );
};

export const useFilters = () => useContext(FiltersContext);
