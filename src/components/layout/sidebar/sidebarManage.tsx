import SidebarSection from "@/components/layout/sidebar/sidebarSection";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import SidebarQueueLink from "@/components/layout/sidebar/sidebarQueueLink";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { Queue } from "@/types/queue";

const SidebarManage = () => {
    const { isAuthenticated, user } = useAuth();

    const { data: queues, isLoading, error } = useSWR<Queue[]>(user ? `/api/queues?user_id=${user.id}` : null, fetcher, {
        revalidateOnFocus: false
    });

    if (!isAuthenticated || isLoading || error) {
        return null;
    }

    return (
        <SidebarSection label="Manage">
            {
                queues?.map(queue => (
                    <SidebarQueueLink key={queue.id} queue={queue} />
                ))
            }
        </SidebarSection>
    );
};

export default SidebarManage;
