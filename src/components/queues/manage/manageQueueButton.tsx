import React, { FC } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Button from "@/components/shared/button";
import { MdEdit } from "react-icons/md";
import { Queue } from "@/types/queue";

interface ManageQueueButtonProps {
    queue: Queue;
}

const ManageQueueButton: FC<ManageQueueButtonProps> = ({ queue }) => {
    const { user, isAdmin } = useAuth();

    if (!(queue.display_data.manager_profiles.some(manager => manager.username === user?.profile.username) || isAdmin)) {
        return null;
    }

    return (
        <Link
            href={`/queues/${queue.id}/manage`}>
            <Button rounded="full" size="lg">
                <MdEdit className="size-6" />
                <p className="lg:block hidden">Manage Queue</p>
            </Button>
        </Link>
    );
};

export default ManageQueueButton;
