'use client'

import {FC} from "react";
import {BeatmapsetRequest} from "@/types/requests/request";
import RequestPanelGridView from "@/components/requests/panels/grid/requestPanelGridView";
import RequestPanelListView from "@/components/requests/panels/list/requestPanelListView";

interface RequestPanelProps {
    request: BeatmapsetRequest;
    view: "list" | "grid";
    editMode?: boolean;
}

const RequestPanel: FC<RequestPanelProps> = ({request, view, editMode = false}) => {
    return view === "grid" ? (
        <RequestPanelGridView request={request}/>
    ) : (
        <RequestPanelListView request={request} editMode={editMode}/>
    );
}

export default RequestPanel;
