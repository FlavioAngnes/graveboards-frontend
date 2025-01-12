import React, {FC} from "react";
import useQueue from "@/hooks/useQueue";
import QueueHeader from "@/components/queues/queueHeader";
import {BeatmapsetsProvider} from "@/providers/beatmapsetsProvider";

export const QueueContent: FC<{ id: number }> = ({id}) => {
    const {queue} = useQueue(id);

    if (!queue) {
        return null;
    }

    return (
        <div className="flex flex-col gap-6">
            <QueueHeader queue={queue}/>
            <BeatmapsetsProvider
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
