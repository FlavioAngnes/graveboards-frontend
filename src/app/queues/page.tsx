import React, {Suspense} from 'react';
import QueueList from "@/components/queues/queueList";
import QueuePanelSkeleton from "@/components/queues/panels/queuePanelSkeleton";
import { verifySession } from "@/actions/session";
import { redirect } from "next/navigation";

const QueuesPage = async () => {
    const session = await verifySession();

    if (!session?.userId) {
        redirect("/");
    }

    return (
        <div className="flex flex-col flex-1 gap-8">
            <div className="text-2xl font-semibold">
                Queues
            </div>
            <Suspense fallback={<QueuePanelSkeleton/>}>
                <div>
                    {<QueueList />}
                </div>
            </Suspense>
        </div>
    );
};

export default QueuesPage;
