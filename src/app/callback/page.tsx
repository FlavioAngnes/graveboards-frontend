'use client';

import {redirect, useSearchParams} from "next/navigation";
import {useEffect} from "react";
import {useAuth} from "@/context/AuthContext";

const CallbackPage = () => {
    const searchParams = useSearchParams();
    const { login } = useAuth();

    useEffect(() => {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');

        if (error) {
            redirect('/');
        }

        if (!code || !state) {
            redirect('/');
        }

        login(code, state).catch((error) => {
            console.error(error);
            redirect('/');
        });
    }, [login, searchParams]);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <p className="text-2xl">Logging in...</p>
        </div>
    )
};

export default CallbackPage;
