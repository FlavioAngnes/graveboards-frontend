"use client";

import { loginUser } from "@/actions/auth";
import { FC, useEffect } from "react";
import { FaCircleNotch } from "react-icons/fa6";

interface CallbackContentProps {
    code: string;
    state: string;
}

export const CallbackContent: FC<CallbackContentProps> = ({code, state}) => {
    useEffect(() => {
        loginUser(code, state).then(() => {
            window.location.href = "/";
        });
    }, [code, state]);

    return (
        <div className="w-full h-[80vh] flex flex-col gap-2 items-center justify-center">
            <FaCircleNotch className="size-8 animate-spin text-primary-500" />
            <p className="text-2xl">Logging in...</p>
        </div>
    );
};
