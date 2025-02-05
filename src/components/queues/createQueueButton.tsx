"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { MdAdd } from "react-icons/md";
import useDialog from "@/hooks/useDialog";
import Button from "@/components/shared/button";
import CreateQueueDialog from "@/components/queues/createQueueDialog";

const CreateQueueButton = () => {
    const { isAdmin } = useAuth();

    const { ref, onOpen, onClose } = useDialog();

    return (
        <div className="flex items-center justify-center">
            {
                isAdmin && (
                    <Button
                        onClick={onOpen}
                        size="lg"
                        rounded="3xl">
                        <MdAdd className="size-6" />
                        Create a queue
                    </Button>
                )
            }

            <CreateQueueDialog ref={ref} onClose={onClose} />
        </div>
    );
};

export default CreateQueueButton;

