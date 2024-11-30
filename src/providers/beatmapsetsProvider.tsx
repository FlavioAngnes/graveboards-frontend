import {FC, ReactNode} from "react";
import {SortingProvider} from "@/context/beatmapsets/SortingContext";
import Beatmapsets from "@/components/beatmapsets/beatmapsets";
import {BeatmapsetsFilters} from "@/types/beatmapsets/Filters";
import {SortingLayerOptions} from "@/types/beatmapsets/Sorting";
import {FiltersProvider} from "@/context/beatmapsets/FiltersContext";

export const BeatmapsetsProvider: FC<{
    title?: string,
    defaultFilters?: BeatmapsetsFilters;
    defaultSortingLayers?: Required<SortingLayerOptions>[];
    queueId?: number;
    showControls?: boolean;
    children?: ReactNode;
}> = ({
          title = 'Beatmapsets',
          //defaultFilters = {},
          defaultSortingLayers = [],
          //queueId,
          showControls = true,
      }) => {
    return (
        <SortingProvider defaultSortingLayers={defaultSortingLayers}>
            <Beatmapsets title={title} showControls={showControls}/>
        </SortingProvider>
    )
}
