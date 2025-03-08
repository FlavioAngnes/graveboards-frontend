"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types/user";
import { fetchUser, logoutUser as logoutUser } from "@/actions/auth";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    isAdmin: boolean;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    isAdmin: false,
    logout: () => {
    }
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = !!user;

    const isAdmin = !!user?.roles?.some((role: { id: number, name: string }) => role.id === 1 && role.name === "admin");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await fetchUser();
                setUser(userData || null);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData().then();
    }, []);

    const logout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error(error);
        }

        setUser(null);
        window.location.reload();
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, isAuthenticated, isAdmin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
