'use client';

import React from 'react';
import {GoHome} from "react-icons/go";
import clsx from "clsx";
import {usePathname} from "next/navigation";
import Link from "next/link";


const Sidebar = () => {
    const pathname = usePathname();
    const isActive = (href: string) => pathname === href;

    return (
        <div className="md:flex-col md:h-screen pt-9 px-6 pb-4 md:sticky fixed top-0 hidden md:flex md:w-64">
            <div className="text-2xl self-center">
                Sidebar
            </div>
            <div className="flex flex-col flex-1 gap-6">
                <div className="flex flex-col flex-1">
                    <div className="font-semibold px-3 mb-4">
                        Discover
                    </div>
                    <Link href="/" className={clsx("flex items-center px-3 py-2 self-stretch gap-2 rounded-lg",
                        {"bg-primary-100 text-black dark:bg-primary-500 dark:text-white": isActive("/")})}>
                        <GoHome className="size-6"/>
                        Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
