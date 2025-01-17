import React from 'react';
import RequestPanelSkeletonGridView from "@/components/requests/panels/grid/requestPanelSkeletonGridView";
import RequestPanelSkeletonListView from "@/components/requests/panels/list/requestPanelSkeletonListView";

interface BeatmapsetPanelSkeletonProps {
    view?: "list" | "grid"
}

const RequestPanelSkeleton = ({view}: BeatmapsetPanelSkeletonProps) => {
    return view === "grid" ? (
        <RequestPanelSkeletonGridView/>
    ) : (
        <RequestPanelSkeletonListView/>
    );
};

export default RequestPanelSkeleton;
