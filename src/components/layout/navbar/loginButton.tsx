"use client";

import { startTransition, useActionState } from "react";
import { FaCircleNotch } from "react-icons/fa6";
import { MdPerson } from "react-icons/md";
import { startOAuth } from "@/actions/auth";

const LoginButton = () => {
    const [state, action, isPending] = useActionState(startOAuth, null);

    if (state?.authorization_url) {
        window.location.href = state.authorization_url;
    }

    return (
        <button
            className="h-14 px-6 items-center gap-2 rounded-full bg-primary-500 hover:bg-primary-400 active:bg-primary-300 disabled:bg-tertiary-500 shrink-0 hidden sm:flex justify-center transition-all duration-300 ease-in-out"
            disabled={isPending}
            onClick={() => startTransition(action)}>
            {isPending ? (
                <FaCircleNotch className="size-6 text-white animate-spin" />
            ) : (
                <>
                    <MdPerson className="size-6 text-white" />
                    <span className="text-white">Login</span>
                </>
            )}
        </button>
    );
};

export default LoginButton;
