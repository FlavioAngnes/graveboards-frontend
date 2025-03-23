"use client";

import { startTransition, useActionState, useState } from "react";
import { FaCircleNotch } from "react-icons/fa6";
import { MdPerson } from "react-icons/md";
import { startOAuth } from "@/actions/auth";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const LoginButton = () => {
    const currentPath = usePathname();
    const isCallback = currentPath === "/callback";

    const [state, action] = useActionState(startOAuth, null);
    const [disabled, setDisabled] = useState(false);

    if (state?.authorization_url) {
        window.location.href = state.authorization_url;
    }

    const { isLoading } = useAuth();

    return (
        disabled || isCallback || isLoading ? (
            <div
                className="h-14 px-4 items-center gap-2 rounded-full bg-tertiary-500 shrink-0 hidden sm:flex justify-center transition-all duration-300 ease-in-out">
                <FaCircleNotch className="size-6 text-white animate-spin" />
            </div>
        ) : (
            <button
                className="h-14 px-6 items-center gap-2 rounded-full bg-primary-500 hover:bg-primary-400 active:bg-primary-300 shrink-0 hidden sm:flex justify-center transition-all duration-300 ease-in-out"
                onClick={() => {
                    startTransition(action);
                    setDisabled(true);
                }}>
                <MdPerson className="size-6 text-white" />
                <span className="text-white">Log In</span>
            </button>
        )
    );
};

export default LoginButton;
