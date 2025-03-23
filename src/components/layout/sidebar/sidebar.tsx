'use client';

import React, { FC } from "react";
import { MdChecklist, MdHome, MdList, MdLogout } from "react-icons/md";
import SidebarSection from "@/components/layout/sidebar/sidebarSection";
import SidebarLink from "@/components/layout/sidebar/sidebarLink";
import { useAuth } from "@/context/AuthContext";
import SidebarManage from "@/components/layout/sidebar/sidebarManage";
import { FaGithub } from "react-icons/fa";
import Button from "@/components/shared/button";
import { GoX } from "react-icons/go";
import { useSidebar } from "@/context/layout/SidebarContext";
import clsx from "clsx";
import SidebarButton from "@/components/layout/sidebar/sidebarButton";
import SidebarLoginButton from "@/components/layout/sidebar/sidebarLoginButton";

const Sidebar: FC = () => {
    const {open, toggleOpen} = useSidebar();
    const {isAuthenticated, logout} = useAuth();

    return (
        <div
            className={clsx(
                `flex flex-col h-screen pt-9 px-6 pb-4 gap-6 md:sticky fixed shrink-0 top-0 w-full md:translate-x-0 md:w-64 border-r border-tertiary-200 dark:border-tertiary-800 dark:bg-black bg-white z-50`,
                { "-translate-x-full": !open }
            )}>
            <div className="flex items-center justify-between md:justify-center gap-2">
                <div className="text-2xl self-center">
                    Graveboards
                </div>
                <Button
                    onClick={toggleOpen}
                    rounded="full"
                    variant="clear"
                    size="lg"
                    className="md:hidden -mr-3 px-3">
                    <GoX className="size-6" />
                </Button>
            </div>

            <div className="flex-1 flex flex-col gap-4">
                <div className="md:hidden">
                    <SidebarSection label={'Profile'}>
                        {isAuthenticated ? (
                            <SidebarButton onClick={() => logout()} label={'Log Out'} icon={<MdLogout className='size-6'/>}/>
                        ) : (
                            <SidebarLoginButton/>
                        )}
                    </SidebarSection>
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
                <SidebarManage/>
            </div>
            <div className="w-full flex flex-col gap-2 items-center justify-center text-sm text-tertiary-500 dark:text-tertiary-400">
                <div>
                    Graveboards © 2025
                </div>
                <div className="flex gap-2">
                    <a href="https://github.com/FlavioAngnes/graveboards-frontend" target="_blank" className="flex gap-1 items-center">
                        <FaGithub className='size-4'/>
                        Front-end
                    </a>
                    <span>•</span>
                    <a href="https://github.com/pianosuki/graveboards" target="_blank" className="flex gap-1 items-center">
                        <FaGithub className='size-4'/>
                        Back-end
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
