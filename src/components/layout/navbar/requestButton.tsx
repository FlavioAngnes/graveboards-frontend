import React, {FC} from 'react';
import {GoLock} from "react-icons/go";
import {useAuth} from "@/context/AuthContext";
import {MdAdd} from "react-icons/md";

interface RequestButtonProps {
    isSearchExpanded: boolean;
}

const RequestButton: FC<RequestButtonProps> = ({isSearchExpanded}) => {
    const {isAuthenticated} = useAuth();

    return (
        <>
            {isAuthenticated ? (<button
                className={`gap-2 items-center overflow-hidden justify-center text-white bg-primary-500 rounded-3xl h-12 flex shrink-0 transition-all duration-300 ${
                    isSearchExpanded ? 'min-w-12' : 'lg:min-w-80 min-w-40'
                }`}>
                <MdAdd className="size-6"/>
                {!isSearchExpanded && (
                    <>
                        <p className="lg:block hidden">Request a Map</p>
                        <p className="block lg:hidden">Request</p>
                    </>
                )}
            </button>) : (
                <button
                    className={`gap-2 items-center overflow-hidden justify-center text-tertiary-600 bg-tertiary-200 dark:text-tertiary-900 dark:bg-tertiary-500 rounded-3xl h-12 flex shrink-0 transition-all duration-300 ${
                        isSearchExpanded ? 'min-w-12' : 'lg:min-w-80 min-w-40'
                    }`} disabled>
                    <GoLock className="size-6"/>
                    {!isSearchExpanded && (
                        <>
                            <p className="lg:block hidden">Login to request</p>
                            <p className="block lg:hidden">Login</p>
                        </>
                    )}
                </button>
            )}
        </>
    );
};

export default RequestButton;


