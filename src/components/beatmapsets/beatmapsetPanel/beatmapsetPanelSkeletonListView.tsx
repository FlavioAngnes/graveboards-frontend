import React from 'react';

const BeatmapsetPanelSkeletonListView = () => {
    return (
        <div className="rounded-xl overflow-hidden bg-tertiary-50 dark:bg-tertiary-900 h-24">
            <div className="flex flex-1 animate-pulse h-full">
                <div className="hidden sm:block h-full aspect-video bg-tertiary-200 dark:bg-tertiary-750"></div>
                <div className="flex w-full items-center gap-8 p-8 sm:p-4 self-stretch">
                    <div className="flex flex-col gap-1 w-1/4 xl:w-1/5">
                        <div className="rounded-xl w-32 h-4 bg-tertiary-200 dark:bg-tertiary-750"></div>
                        <div className="rounded-xl w-24 h-3 bg-tertiary-200 dark:bg-tertiary-750"></div>
                        <div className="block lg:hidden rounded-xl w-24 h-3 bg-tertiary-100 dark:bg-tertiary-750"></div>
                    </div>

                    <div className="hidden lg:flex items-center gap-2 truncate">
                        <div className="rounded-full size-10 bg-tertiary-200 dark:bg-tertiary-750"></div>
                        <div className="flex flex-col gap-1">
                            <div className="rounded-xl w-24 h-3 bg-tertiary-200 dark:bg-tertiary-750"></div>
                            <div className="rounded-xl w-32 h-4 bg-tertiary-200 dark:bg-tertiary-750"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeatmapsetPanelSkeletonListView;
