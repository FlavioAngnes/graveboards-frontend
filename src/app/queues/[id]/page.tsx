import React, { FC } from "react";
import { QueueContent } from "@/components/queues/queueContent";

interface QueuePageProps {
    params: Promise<{ id: string }>;
}

const QueuePage: FC<QueuePageProps> = async ({ params }) => {
    const id = Number((await params).id);

    if (id === null) {
        return null;
    }

    return (<QueueContent id={id} />);
};

export default QueuePage;

