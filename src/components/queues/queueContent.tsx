"use client";

import React, { FC } from "react";
import { RequestsProvider } from "@/providers/requestsProvider";
import QueueHeader from "@/components/queues/queueHeader";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import QueueHeaderSkeleton from "@/components/queues/queueHeaderSkeleton";

export const QueueContent: FC<{ id: number }> = ({ id }) => {
    const { data: queue, error, isLoading } = useSWR(`/api/queues/${id}`, fetcher);

    if (error) {
        return <div>Failed to load queue</div>;
    }

    return (
        <div className="flex flex-col gap-6">
            { isLoading ? <QueueHeaderSkeleton /> : <QueueHeader queue={queue} /> }
            <RequestsProvider
                title="Queue Requests"
                defaultSortingLayers={[
                    {
                        value: "Request.created_at",
                        order: "desc",
                        isDefault: true
                    }
                ]}
                queueId={id}
            />
        </div>
    );
};
