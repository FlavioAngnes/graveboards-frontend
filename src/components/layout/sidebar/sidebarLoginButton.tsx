"use client";

import React, { startTransition, useActionState, useState } from "react";
import { FaCircleNotch } from "react-icons/fa6";
import { MdLogin } from "react-icons/md";
import { startOAuth } from "@/actions/auth";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/shared/button";

const SidebarLoginButton = () => {
    const currentPath = usePathname();
    const isCallback = currentPath === "/callback";

    const [state, action] = useActionState(startOAuth, null);
    const [disabled, setDisabled] = useState(false);

    if (state?.authorization_url) {
        window.location.href = state.authorization_url;
    }

    const { isLoading } = useAuth();

    const isDisabled = disabled || isCallback || isLoading;

    return (
        <Button onClick={() => {
            startTransition(action);
            setDisabled(true);
        }}
                variant="clear"
                className="w-full justify-start gap-2 rounded-lg px-3 py-2"
                disabled={disabled || isCallback || isLoading}
        >
            {
                isDisabled ? (
                    <>
                        <FaCircleNotch className="size-6 animate-spin" />
                        Loading...
                    </>
                ) : (
                    <>
                        <MdLogin className="size-6" />
                        Log In
                    </>
                )
            }
        </Button>
    );
};

export default SidebarLoginButton;
