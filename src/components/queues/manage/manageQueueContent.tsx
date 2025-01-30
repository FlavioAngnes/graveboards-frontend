import React, {FC} from "react";
import useQueue from "@/hooks/queues/useQueue";
import {RequestsProvider} from "@/providers/requestsProvider";
import ManageQueueHeader from "@/components/queues/manage/manageQueueHeader";

export const ManageQueueContent: FC<{ id: number }> = ({id}) => {
    const {queue} = useQueue(id);

    if (!queue) {
        return null;
    }

    return (
        <div className="flex flex-col gap-6">
            <ManageQueueHeader queue={queue}/>
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
                editMode={true}
            />
        </div>
    );
};
