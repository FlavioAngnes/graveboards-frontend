import React from 'react';

const BeatmapsetPanelSkeletonGridView = () => {
    return (
        <div
            className="flex flex-col items-start shrink-0 rounded-xl overflow-hidden self-stretch min-w-72 h-64 bg-tertiary-50 dark:bg-tertiary-900">
            <div className="animate-pulse w-full h-full">
                <div className="flex h-[9.75rem] bg-tertiary-200 dark:bg-tertiary-750"></div>
                <div className="flex gap-3 p-2.5 self-stretch min-w-24 relative">
                    <div className="rounded-full size-10 bg-tertiary-200 dark:bg-tertiary-750"></div>
                    <div className="flex flex-col gap-1 flex-1 mb-8">
                        <div className="rounded-xl w-32 h-4 bg-tertiary-200 dark:bg-tertiary-750"></div>
                        <div className="rounded-xl w-24 h-3 bg-tertiary-200 dark:bg-tertiary-750"></div>
                        <div className="rounded-xl w-24 h-3 bg-tertiary-200 dark:bg-tertiary-750"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeatmapsetPanelSkeletonGridView;
