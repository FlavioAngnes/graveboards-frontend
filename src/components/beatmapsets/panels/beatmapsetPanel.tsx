'use client'

import {FC} from "react";
import {Beatmapset} from "@/types/beatmapsets/beatmapset";
import BeatmapsetPanelGridView from "@/components/beatmapsets/panels/grid/beatmapsetPanelGridView";
import BeatmapsetPanelListView from "@/components/beatmapsets/panels/list/beatmapsetPanelListView";

interface BeatmapsetProps {
    beatmapset: Beatmapset;
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
