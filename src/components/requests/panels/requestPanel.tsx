'use client'

import {FC} from "react";
import {BeatmapsetListing} from "@/types/beatmapsets/beatmapset";
import RequestPanelGridView from "@/components/requests/panels/grid/requestPanelGridView";
import RequestPanelListView from "@/components/requests/panels/list/requestPanelListView";

interface RequestPanelProps {
    beatmapset: BeatmapsetListing;
    view: "list" | "grid";
    editMode?: boolean;
}

const RequestPanel: FC<RequestPanelProps> = ({beatmapset, view, editMode = false}) => {
    return view === "grid" ? (
        <RequestPanelGridView beatmapset={beatmapset}/>
    ) : (
        <RequestPanelListView beatmapset={beatmapset} editMode={editMode}/>
    );
}

export default RequestPanel;
