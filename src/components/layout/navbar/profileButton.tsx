import React from 'react';
import {useAuth} from "@/context/AuthContext";
import {GoPersonFill} from "react-icons/go";

const ProfileButton = () => {
    const {user, isAuthenticated, logout} = useAuth();

    const handleLogin = async () => {
        const {authorization_url} = await fetch('/api/auth/login').then((res) => res.json());

        if (authorization_url) {
            window.location.href = authorization_url;
        } else {
            console.error('Error logging in');
        }
    }

    return isAuthenticated ? (
        <button className="size-14 rounded-full bg-cover shrink-0 hidden sm:block" style={{backgroundImage: `url(${user?.profile.avatar_url})`}}
                onClick={() => logout()}></button>
    ) : (
        <button className="size-14 rounded-full bg-primary-500 shrink-0 hidden sm:flex items-center justify-center"
                onClick={() => handleLogin()}>
            <GoPersonFill className="size-6 text-white"/>
        </button>
    );
};

export default ProfileButton;
