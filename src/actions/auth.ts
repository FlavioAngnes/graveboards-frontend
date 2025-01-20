"use server";

import { createSession, deleteSession, verifySession } from "@/actions/session";
import { cache } from "react";
import { User } from "@/types/user";
import { redirect } from "next/navigation";

const { API_URL } = process.env;

if (!API_URL) {
    throw new Error(
        "Please define the BACKEND_URL environment variable inside .env.local"
    );
}

export interface LoginResponse {
    authorization_url: string;
    state: string;
}

export const startOAuth = async () => {
    const response = await fetch(`${API_URL}/login`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
        return;
    }

    return await response.json() as LoginResponse;
};

export interface CodeResponse {
    token: string;
    user_id: string;
}

export const loginUser = async (code: string, state: string) => {
    const response = await fetch(`${API_URL}/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({ code, state }).toString()
    });

    if (!response.ok) {
        throw new Error("Failed to fetch token");
    }

    const {token} = await response.json() as CodeResponse;

    const data = await fetchToken(token);

    await createSession(data);
};

export interface TokenResponse {
    token: string;
    user_id: string;
    issued_at: number;
    expires_at: number;
    is_revoked: boolean;
    updated_at: string;
}

export const fetchToken = async (token: string) => {
    const response = await fetch(`${API_URL}/token?token=${token}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch token");
    }

    return await response.json() as TokenResponse;
};

export const logoutUser = async () => {
    await deleteSession();
    redirect("/");
}

export const fetchUser = cache(async () => {
    const session = await verifySession();

    if (!session) {
        return;
    }

    const response = await fetch(`${API_URL}/users/${session.userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.token}`,
        },
    });

    if (!response.ok) {
        return;
    }

    return await response.json() as User;
});

