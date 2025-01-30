import SidebarSection from "@/components/layout/sidebar/sidebarSection";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import useUserQueue from "@/hooks/queues/useUserQueue";
import SidebarQueueLink from "@/components/layout/sidebar/sidebarQueueLink";

const SidebarManage = () => {
    const { isAuthenticated, user, isAdmin } = useAuth();

    const { queue } = useUserQueue(user?.id);

    if (!isAuthenticated || !queue) {
        return null;
    }

    return (
        <SidebarSection label="Manage">
            <SidebarQueueLink queue={queue} label={"Your Queue"} />
            {/*
                isAdmin && (
                    <SidebarLink href={`/requests/manage`} label="Verify Requests" icon={<MdPlaylistAdd className="size-6"/>} />
                )
             */}
        </SidebarSection>
    );
};

export default SidebarManage;
