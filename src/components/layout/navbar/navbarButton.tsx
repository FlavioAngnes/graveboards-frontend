"use client";

import LoginButton from "@/components/layout/navbar/loginButton";
import ProfileButton from "@/components/layout/navbar/profileButton";
import { useAuth } from "@/context/AuthContext";

const NavbarButton = () => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? (
        <ProfileButton />
        ) : (
        <LoginButton />
    );
};

export default NavbarButton;
