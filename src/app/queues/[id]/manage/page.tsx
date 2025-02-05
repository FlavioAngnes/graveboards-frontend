import React, {FC} from 'react';
import {ManageQueueContent} from "@/components/queues/manage/manageQueueContent";

interface QueuePageProps {
    params: Promise<{ id: string }>;
}

const ManageQueuePage: FC<QueuePageProps> = async ({params}) => {
    const id = (await params).id;

    return <ManageQueueContent id={Number(id)} />;
};

export default ManageQueuePage;

