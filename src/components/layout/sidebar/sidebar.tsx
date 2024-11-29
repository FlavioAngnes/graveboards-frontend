'use client';

import React from 'react';
import {MdChecklist, MdHome, MdList} from "react-icons/md";
import SidebarSection from "@/components/layout/sidebar/sidebarSection";
import SidebarLink from "@/components/layout/sidebar/sidebarLink";
import {useAuth} from "@/context/AuthContext";


const Sidebar = () => {
    const {user, isAuthenticated, isAdmin} = useAuth();

    return (
        <div
            className="md:flex-col md:h-screen pt-9 px-6 pb-4 gap-6 md:sticky fixed shrink-0 top-0 hidden md:flex md:w-64 border-r border-tertiary-200 dark:border-tertiary-800">
            <div className="text-2xl self-center">
                Graveboards
            </div>
            <SidebarSection label='Discover'>
                <SidebarLink href={'/home'} label='Home' icon={<MdHome className='size-6'/>}/>
                {isAuthenticated && (
                    <>
                        <SidebarLink href={'/requests'} label='My Requests' icon={<MdChecklist className='size-6'/>}/>
                        <SidebarLink href={'/queues'} label='Queues' icon={<MdList className='size-6'/>}/>
                    </>
                )}
            </SidebarSection>
        </div>
    );
};

export default Sidebar;
