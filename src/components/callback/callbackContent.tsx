"use client";

import { redirect, useSearchParams } from "next/navigation";
import { loginUser } from "@/actions/auth";
import { useEffect } from "react";

export const CallbackContent = () => {
    const searchParams = useSearchParams();

    useEffect(() => {
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const error = searchParams.get("error");

        if (error || !code || !state) {
            redirect("/");
        }

        loginUser(code, state).catch((error) => {
            console.error(error);
        }).finally(() => {
            redirect("/");
        });
    }, [searchParams]);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <p className="text-2xl">Logging in...</p>
        </div>
    );
};
