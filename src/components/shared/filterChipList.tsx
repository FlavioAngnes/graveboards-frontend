import React, { FC } from "react";
import { useFilters } from "@/context/beatmapsets/BeatmapsetListFiltersContext";
import FilterChip from "@/components/shared/filterChip";
import { BeatmapsetListFiltersMap } from "@/data/beatmapsets/filters";
import { FilterOperators } from "@/types/filters";

export const FilterChipList: FC = () => {
    const { userFilters: filters} = useFilters();

    if (filters.length === 0) return null;

    return (
        <div className="flex gap-2">
            {filters.map((filter, index) => (
                Object.entries(filter.options).map(([key, value]) => (
                    <FilterChip
                        name={filter.value}
                        key={`${index}-${key}`}
                        label={BeatmapsetListFiltersMap[filter.value].label}
                        option={{
                            operation: key as FilterOperators,
                            value: value
                        }} />
                ))
            ))}
        </div>
    );
};
