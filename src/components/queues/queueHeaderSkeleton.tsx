import React from 'react';

const QueuePanelSkeleton = () => {
    return (
        <div
            className="px-8 py-6 gap-8 flex items-center rounded-xl self-stretch">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 flex-1 overflow-hidden animate-pulse">
                <div
                    className="size-24 bg-tertiary-100 dark:bg-tertiary-750 rounded-xl shrink-0"></div>
                <div className="flex flex-col gap-2 w-4/5 sm:w-3/5 lg:w-auto lg:flex-1">
                    <div className="flex flex-col gap-1 flex-1">
                        <div className="rounded-xl w-32 h-4 bg-tertiary-100 dark:bg-tertiary-750"></div>
                        <div className="rounded-xl w-24 h-3 bg-tertiary-100 dark:bg-tertiary-750"></div>
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <div className="rounded-xl w-2/3 h-3 bg-tertiary-100 dark:bg-tertiary-750"></div>
                        <div className="rounded-xl w-1/2 h-3 bg-tertiary-100 dark:bg-tertiary-750"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QueuePanelSkeleton;
