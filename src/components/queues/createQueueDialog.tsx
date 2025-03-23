"use client";

import React, { forwardRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { createPortal } from "react-dom";
import Dialog from "@/components/shared/dialog";
import Button from "@/components/shared/button";
import { postQueue } from "@/actions/queues";
import toast from "react-hot-toast";

interface RequestDialogProps {
    onClose: () => void;
}

const CreateQueueDialog = forwardRef<HTMLDialogElement, RequestDialogProps>(
    ({ onClose }, ref) => {
        const [userId, setUserId] = useState<string>("");
        const [name, setName] = useState<string>("");
        const [description, setDescription] = useState<string>("");

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();

            if (!isAdmin || !user) return;

            const result = await postQueue({
                user_id: Number(userId),
                name: name,
                description: description
            });

            if (result) {
                toast.success("Queue created successfully");
            } else {
                toast.error("Failed to create queue");
            }

            onClose();
        };

        const { user, isAdmin } = useAuth();

        if (typeof document === undefined || !isAdmin) return null;

        return (
            createPortal(
                <Dialog title={"Create Queue"} ref={ref} onClose={onClose}>
                    <form className="flex flex-col gap-3 mt-2" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold dark:text-white">
                                User ID<span className="text-red-500">*</span>
                            </span>
                            <input
                                className=
                                    "w-full sm:w-auto placeholder-tertiary-500 dark:placeholder-tertiary-400 whitespace-nowrap p-2 rounded-lg dark:bg-tertiary-900 outline-none border flex items-center justify-between gap-1 transition-colors duration-300 ease-in-out focus:border-primary-500 focus:bg-tertiary-100 focus:dark:bg-tertiary-800 border-tertiary-300 dark:border-tertiary-700"
                                placeholder="User ID"
                                pattern={"[0-9]+"}
                                required={true}
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold dark:text-white">
                                Queue Name<span className="text-red-500">*</span>
                            </span>
                            <input
                                className=
                                    "w-full sm:w-auto placeholder-tertiary-500 dark:placeholder-tertiary-400 whitespace-nowrap p-2 rounded-lg dark:bg-tertiary-900 outline-none border flex items-center justify-between gap-1 transition-colors duration-300 ease-in-out focus:border-primary-500 focus:bg-tertiary-100 focus:dark:bg-tertiary-800 border-tertiary-300 dark:border-tertiary-700"
                                placeholder="Queue Name"
                                required={true}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                        <span className="font-semibold dark:text-white">
                            Description<span className="text-red-500">*</span>
                        </span>
                            <textarea
                                className=
                                    "w-full sm:w-auto placeholder-tertiary-500 dark:placeholder-tertiary-400 whitespace-nowrap p-2 rounded-lg dark:bg-tertiary-900 outline-none border flex items-center justify-between gap-1 transition-colors duration-300 ease-in-out focus:border-primary-500 focus:bg-tertiary-100 focus:dark:bg-tertiary-800 border-tertiary-300 dark:border-tertiary-700"
                                placeholder="Description"
                                value={description}
                                required={true}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <footer className="flex justify-end gap-2 mt-2">
                            <Button
                                rounded="lg"
                                className="px-4 py-2"
                                type="submit"
                            >
                                Request
                            </Button>
                        </footer>
                    </form>
                </Dialog>,
                document.body
            )
        );
    }
);

CreateQueueDialog.displayName = "CreateQueueDialog";

export default CreateQueueDialog;
