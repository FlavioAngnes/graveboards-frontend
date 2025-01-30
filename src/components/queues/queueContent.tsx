"use client";

import React, {FC} from "react";
import useQueue from "@/hooks/queues/useQueue";
import {RequestsProvider} from "@/providers/requestsProvider";
import QueueHeader from "@/components/queues/queueHeader";

export const QueueContent: FC<{ id: number }> = ({id}) => {
    const {queue} = useQueue(id);

    if (!queue) {
        return null;
    }

    return (
        <div className="flex flex-col gap-6">
            <QueueHeader queue={queue}/>
            <RequestsProvider
                title="Queue Requests"
                defaultSortingLayers={[
                    {
                        value: 'Request.created_at',
                        order: 'desc',
                        isDefault: true,
                    },
                ]}
                queueId={id}
            />
        </div>
    );
};
