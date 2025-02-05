import React from 'react';
import { verifySession } from "@/actions/session";
import { redirect } from "next/navigation";
import QueuesContent from "@/components/queues/queuesContent";

const QueuesPage = async () => {
    const session = await verifySession();

    if (!session?.userId) {
        redirect("/");
    }

    return <QueuesContent />;
};

export default QueuesPage;
