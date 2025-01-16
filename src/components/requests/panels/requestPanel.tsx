'use client'

import {FC} from "react";
import {BeatmapsetListing} from "@/types/beatmapsets/beatmapset";
import RequestPanelGridView from "@/components/requests/panels/grid/requestPanelGridView";
import RequestPanelListView from "@/components/requests/panels/list/requestPanelListView";

interface RequestPanelProps {
    beatmapset: BeatmapsetListing;
    view: "list" | "grid";
    editable?: boolean;
    showQueue?: boolean;
}

const RequestPanel: FC<RequestPanelProps> = ({beatmapset, view, editable = false, showQueue = true}) => {
    return view === "grid" ? (
        <RequestPanelGridView beatmapset={beatmapset} showQueue={showQueue}/>
    ) : (
        <RequestPanelListView beatmapset={beatmapset} editable={editable}/>
    );
}

export default RequestPanel;
