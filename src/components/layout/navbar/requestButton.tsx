"use client";

import React from "react";
import { GoLock } from "react-icons/go";
import { useAuth } from "@/context/AuthContext";
import { MdAdd } from "react-icons/md";
import useDialog from "@/hooks/useDialog";
import Button from "@/components/shared/button";
import RequestDialog from "@/components/layout/navbar/requestDialog";

const RequestButton = () => {
    const { isAuthenticated } = useAuth();

    const { ref, onOpen, onClose } = useDialog();

    return (
        <>
            {
                isAuthenticated ? (
                    <Button
                        onClick={onOpen}
                        size="lg"
                        rounded="3xl"
                        className="shrink-0 lg:min-w-80 min-w-12">
                        <MdAdd className="size-6" />
                        <p className="lg:block hidden">Request a Map</p>
                    </Button>
                ) : (
                    <Button
                        size="lg"
                        rounded="3xl"
                        className="shrink-0 lg:min-w-80 min-w-12"
                        disabled={true}>
                        <GoLock className="size-6" />
                        <p className="lg:block hidden">Login to request</p>
                    </Button>
                )
            }

            <RequestDialog ref={ref} onClose={onClose} />
        </>
    );
};

export default RequestButton;

