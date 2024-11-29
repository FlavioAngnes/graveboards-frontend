import {FC, ReactNode} from "react";
import {SortingProvider} from "@/context/beatmapsets/SortingContext";
import Beatmapsets from "@/components/beatmapsets/beatmapsets";
import {BeatmapsetListingFilters} from "@/types/Filters";
import {SortingLayerOptions} from "@/types/beatmapsets/Sorting";

export const BeatmapsetsProvider: FC<{
    title?: string,
    defaultFilters?: BeatmapsetListingFilters;
    defaultSortingLayers?: SortingLayerOptions[];
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
