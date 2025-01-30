import React, { FC } from "react";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/shared/button";
import clsx from "clsx";
import { MdCheck, MdClose } from "react-icons/md";
import { Queue } from "@/types/queue";

interface QueueStatusButtonProps {
    isOpen: boolean,
    setIsOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    queue: Queue
}

const QueueStatusButton: FC<QueueStatusButtonProps> = ({ isOpen, setIsOpen, queue }) => {
    const { user, isAdmin } = useAuth();
    const isManager = user && queue.manager_profiles.some(manager => manager.id === user.id);

    return (isManager || isAdmin) && (
        <Button
            onClick={() => setIsOpen(!isOpen)}
            rounded="full"
            size="lg"
            className={clsx(
                isOpen ? "bg-primary-500 hover:bg-primary-400 active:bg-primary-300" : "bg-green-500 hover:bg-green-400 active:bg-green-300"
            )}
        >
            {isOpen ? (
                <>
                    <MdClose className="size-6" />
                    Close Queue
                </>
            ) : (
                <>
                    <MdCheck className="size-6" />
                    Open Queue
                </>
            )}
        </Button>
    );
};

export default QueueStatusButton;
