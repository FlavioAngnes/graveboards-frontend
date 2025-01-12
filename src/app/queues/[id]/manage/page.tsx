'use client';

import React, {FC, useEffect, useState} from 'react';
import {ManageQueueContent} from "@/components/queues/manage/manageQueueContent";

interface QueuePageProps {
    params: Promise<{ id: string }>;
}

const ManageQueuePage: FC<QueuePageProps> = ({params}) => {
    const [id, setId] = useState<number | null>(null);

    useEffect(() => {
        const fetchId = async () => {
            const id = Number((await params).id);
            setId(id);
        };

        fetchId();
    }, [params]);

    if (id === null) {
        return null;
    }

    return <ManageQueueContent id={id} />;
};

export default ManageQueuePage;

