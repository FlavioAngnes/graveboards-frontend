'use client';

import React, {FC} from 'react';
import {GoLock} from "react-icons/go";
import {useAuth} from "@/context/AuthContext";
import {MdAdd} from "react-icons/md";
import useDialog from "@/hooks/useDialog";
import Button from "@/components/shared/button";
import RequestDialog from "@/components/layout/navbar/requestDialog";

interface RequestButtonProps {
    isSearchExpanded: boolean;
}

const RequestButton: FC<RequestButtonProps> = ({isSearchExpanded}) => {
    const {isAuthenticated} = useAuth();

    const {ref, onOpen, onClose} = useDialog();

    return (
        <>
            {
                isAuthenticated ? (
                    <Button
                        onClick={onOpen}
                        size="lg"
                        rounded="3xl"
                        className={`shrink-0 ${
                            isSearchExpanded ? 'min-w-12' : 'lg:min-w-80 min-w-40'
                        }`}>
                        <MdAdd className="size-6"/>
                        {!isSearchExpanded && (
                            <>
                                <p className="lg:block hidden">Request a Map</p>
                                <p className="block lg:hidden">Request</p>
                            </>
                        )}
                    </Button>
                ) : (
                    <Button
                        size="lg"
                        rounded="3xl"
                        className={`shrink-0 ${
                            isSearchExpanded ? 'min-w-12' : 'lg:min-w-80 min-w-40'
                        }`} disabled>
                        <GoLock className="size-6"/>
                        {!isSearchExpanded && (
                            <>
                                <p className="lg:block hidden">Login to request</p>
                                <p className="block lg:hidden">Login</p>
                            </>
                        )}
                    </Button>
                )
            }

            <RequestDialog ref={ref} onClose={onClose}/>
        </>
    );
};

export default RequestButton;

