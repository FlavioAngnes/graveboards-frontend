"use client";

import React, { useState } from "react";
import QueuePanel from "@/components/queues/panels/queuePanel";
import QueuePanelSkeleton from "@/components/queues/panels/queuePanelSkeleton";
import useSWRQueues from "@/hooks/queues/useSWRQueues";
import InfiniteScroll from "react-infinite-scroll-component";

const QueueList = () => {
    const [page, setPage] = useState(0);

    const { queues, error, isReachingEnd } = useSWRQueues({ limit: 0 });

    if (error) {
        return null;
    }

    return (
        <InfiniteScroll
            dataLength={queues.length}
            next={() => setPage(page + 1)}
            hasMore={!isReachingEnd}
            loader={<QueuePanelSkeleton />}
            className="flex flex-col gap-4">
            {queues.map((queue) => (
                    <QueuePanel key={queue.id} queue={queue} />
                )
            )}
        </InfiniteScroll>
    );
};

export default QueueList;
