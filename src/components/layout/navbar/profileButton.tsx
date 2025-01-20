"use client";

import { useAuth } from "@/context/AuthContext";
import { FaCircleNotch } from "react-icons/fa6";

const ProfileButton = () => {
    const { user, isLoading, logout } = useAuth();

    return (
        <button className="size-14 rounded-full bg-cover shrink-0 hidden sm:flex items-center justify-center disabled:bg-tertiary-500"
                style={{ backgroundImage: `url(${user?.profile.avatar_url})` }}
                disabled={isLoading}
                onClick={() => logout()}>
            {isLoading && (
                <FaCircleNotch className="size-6 text-white animate-spin" />
            )}
        </button>
    );
}

export default ProfileButton;
