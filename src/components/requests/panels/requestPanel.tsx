'use client'

import {FC} from "react";
import {BeatmapsetRequest} from "@/types/requests/request";
import RequestPanelGridView from "@/components/requests/panels/grid/requestPanelGridView";
import RequestPanelListView from "@/components/requests/panels/list/requestPanelListView";

interface RequestPanelProps {
    requests: BeatmapsetRequest;
    view: "list" | "grid";
    editMode?: boolean;
}

const RequestPanel: FC<RequestPanelProps> = ({requests, view, editMode = false}) => {
    return view === "grid" ? (
        <RequestPanelGridView request={requests}/>
    ) : (
        <RequestPanelListView request={requests} editMode={editMode}/>
    );
}

export default RequestPanel;
