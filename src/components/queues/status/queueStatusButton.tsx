import React, { FC, useActionState } from "react";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/shared/button";
import clsx from "clsx";
import { MdCheck, MdClose } from "react-icons/md";
import { FaCircleNotch } from "react-icons/fa6";
import { patchQueue } from "@/actions/queues";
import toast from "react-hot-toast";
import { Queue } from "@/types/queue";

interface QueueStatusButtonProps {
    queue: Queue,
    disabled?: boolean,
    onClick?: (status: boolean) => void,
}

const QueueStatusButton: FC<QueueStatusButtonProps> = ({
                                                           queue,
                                                           disabled,
                                                           onClick
                                                       }) => {
    const [state, dispatch, isPending] = useActionState(async (prevState: {
        is_open: boolean;
    }) => {
        const result = await patchQueue(queue.id, { is_open: !prevState.is_open });

        if (result) {
            toast.success("Queue status updated successfully.");

            if (onClick) onClick(!prevState.is_open);

            return { is_open: !prevState.is_open };
        } else {
            toast.error("Failed to update queue status.");

            if (onClick) onClick(!prevState.is_open);

            return prevState;
        }
    }, { is_open: queue.is_open });

    const { user, isAdmin } = useAuth();
    const isManager = user && queue.manager_profiles.some(manager => manager.id === user.id);


    return (isManager || isAdmin) && (
        <form action={dispatch}>
            <Button
                disabled={disabled || isPending}
                rounded="full"
                variant="fill"
                size="lg"
                className={clsx(
                    state.is_open ? "border-primary-500 hover:border-primary-400 active:border-primary-300" : "bg-green-500 hover:bg-green-400 active:bg-green-300"
                )}
            >
                {isPending ? (
                    <>
                        <div className="items-center justify-center flex ml-1.5">
                            <FaCircleNotch className="size-4 animate-spin" />
                        </div>

                        {state.is_open ? (
                            <>
                                Closing Queue...
                            </>
                        ) : (
                            <>
                                Opening Queue...
                            </>
                        )}
                    </>
                ) : (
                    state.is_open ? (
                        <>
                            <MdClose className="size-6" />
                            Close Queue
                        </>
                    ) : (
                        <>
                            <MdCheck className="size-6" />
                            Open Queue
                        </>
                    )
                )}
            </Button>
        </form>
    );
};

export default QueueStatusButton;
