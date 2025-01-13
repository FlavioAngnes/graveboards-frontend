import React from 'react';
import BeatmapsetPanelSkeletonGridView from "@/components/beatmapsets/beatmapsetPanel/grid/beatmapsetPanelSkeletonGridView";
import BeatmapsetPanelSkeletonListView from "@/components/beatmapsets/beatmapsetPanel/list/beatmapsetPanelSkeletonListView";

interface BeatmapsetPanelSkeletonProps {
    view?: "list" | "grid"
}

const BeatmapsetPanelSkeleton = ({view}: BeatmapsetPanelSkeletonProps) => {
    return view === "grid" ? (
        <BeatmapsetPanelSkeletonGridView/>
    ) : (
        <BeatmapsetPanelSkeletonListView/>
    );
};

export default BeatmapsetPanelSkeleton;
