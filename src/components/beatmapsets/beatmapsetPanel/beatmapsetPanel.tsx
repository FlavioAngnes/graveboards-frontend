'use client'

import {FC} from "react";
import {BeatmapsetListing} from "@/types/beatmapsets/beatmapset";
import BeatmapsetPanelGridView from "@/components/beatmapsets/beatmapsetPanel/grid/beatmapsetPanelGridView";
import BeatmapsetPanelListView from "@/components/beatmapsets/beatmapsetPanel/list/beatmapsetPanelListView";

interface BeatmapsetProps {
    beatmapset: BeatmapsetListing;
    view: "list" | "grid";
}

const BeatmapsetPanel: FC<BeatmapsetProps> = ({beatmapset, view}) => {
    return view === "grid" ? (
        <BeatmapsetPanelGridView beatmapset={beatmapset}/>
    ) : (
        <BeatmapsetPanelListView beatmapset={beatmapset}/>
    );
}

export default BeatmapsetPanel;
