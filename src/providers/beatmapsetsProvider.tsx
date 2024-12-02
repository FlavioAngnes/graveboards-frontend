import {FC, ReactNode} from "react";
import {SortingProvider} from "@/context/beatmapsets/SortingContext";
import Beatmapsets from "@/components/beatmapsets/beatmapsets";
import {SortingLayerOptions} from "@/types/beatmapsets/Sorting";
import {FiltersProvider} from "@/context/beatmapsets/FiltersContext";
import {FilterOptions} from "@/types/beatmapsets/Filters";

export const BeatmapsetsProvider: FC<{
    title?: string,
    defaultFilters?: Required<FilterOptions<never>>[];
    defaultSortingLayers?: Required<SortingLayerOptions>[];
    queueId?: number;
    showControls?: boolean;
    children?: ReactNode;
}> = ({
          title = 'Beatmapsets',
          defaultFilters = [],
          defaultSortingLayers = [],
          //queueId,
          showControls = true,
      }) => {
    return (
        <FiltersProvider defaultFilters={defaultFilters}>
            <SortingProvider defaultSortingLayers={defaultSortingLayers}>
                <Beatmapsets title={title} showControls={showControls}/>
            </SortingProvider>
        </FiltersProvider>
    )
}
