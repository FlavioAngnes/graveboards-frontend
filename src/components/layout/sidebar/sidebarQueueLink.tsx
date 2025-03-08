import React, { FC } from "react";
import { Queue } from "@/types/queue";
import SidebarLink from "@/components/layout/sidebar/sidebarLink";

interface SidebarQueueLinkProps {
    queue?: Queue;
    label?: string;
}

const SidebarQueueLink: FC<SidebarQueueLinkProps> = ({ queue, label }) => {
    return (
        queue &&
        (
            <SidebarLink href={`/queues/${queue.id}/manage`}
                         label={label || queue.name}
                         icon={
                             <div className="size-6 bg-tertiary-500 rounded bg-cover"
                                  style={{ backgroundImage: `url(${queue.user_profile.avatar_url})` }} />
                         }
                         isActive={(pathname, href) => pathname.includes(href)}
            />
        )
    );
};

export default SidebarQueueLink;
