'use client';

import React, {Suspense} from 'react';
import Queues from "@/components/queues/queues";
import QueuePanelSkeleton from "@/components/queues/queuePanelSkeleton";

const QueuesPage = () => {
    return (
        <div className="flex flex-col flex-1 gap-8">
            <div className="text-2xl font-semibold">
                Queues
            </div>
            <Suspense fallback={<QueuePanelSkeleton/>}>
                <div>
                    {<Queues />}
                </div>
            </Suspense>
        </div>
    );
};

export default QueuesPage;
