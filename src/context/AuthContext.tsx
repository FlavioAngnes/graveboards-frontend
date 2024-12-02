'use client';

import React, {createContext, useContext, useEffect, useState} from 'react';
import {User} from "@/types/user";
import {PostTokenResponse} from "@/app/api/auth/token/route";
import {useRouter} from "next/navigation";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (code: string, state: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    isAdmin: false,
    login: async () => {
    },
    logout: () => {
    },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const isAuthenticated = !!user;

    const isAdmin = !!user?.roles?.some((role: { id: number, name: string }) => role.id === 1 && role.name === 'admin');

    const login = async (code: string, state: string) => {
        const response = await fetch('/api/auth/token', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({code, state}),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch token');
        }

        const data: PostTokenResponse = await response.json();
        const {token, user_id} = data;
        localStorage.setItem('token', token);

        const user = await getUser(user_id);

        if (!user) {
            throw new Error('Failed to fetch user');
        }

        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const logout = () => {
        localStorage.removeItem('token');

        setUser(null);
        localStorage.removeItem('user');

        router.push('/');
    };

    const getUser = async (user_id: string) => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }

        const response = await fetch(`/api/users/${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        return await response.json() as User;
    }

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }

            const response = await fetch(`/api/auth/token?token=${token}`, {
                method: 'GET',
            });

            if (!response.ok) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                return;
            }

            const data = await response.json();

            const {user_id} = data;
            localStorage.setItem('token', token);

            const user = await getUser(user_id);

            if (!user) {
                throw new Error('Failed to fetch user');
            }

            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
        }

        verifyToken().then();
    }, []);

    return (
        <AuthContext.Provider value={{user, isAuthenticated, isAdmin, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
