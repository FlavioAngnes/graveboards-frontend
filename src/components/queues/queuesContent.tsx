"use client";

import React from "react";
import QueueList from "@/components/queues/queueList";
import CreateQueueButton from "@/components/queues/createQueueButton";

const QueuesContent = () => {
    return (
        <div className="flex flex-col flex-1 gap-8">
            <div className="flex items-center justify-between">
                <div className="text-2xl font-semibold">
                    Queues
                </div>
                <CreateQueueButton />
            </div>
            <QueueList />
        </div>
    );
};

export default QueuesContent;
