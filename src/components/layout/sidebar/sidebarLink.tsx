import React, {FC} from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";

interface SidebarLinkProps {
    label?: string;
    href: string;
    icon?: React.ReactNode;
    isActive?: (pathname:string, href: string) => boolean;
}

const SidebarLink: FC<SidebarLinkProps> = ({label, href, icon, isActive}) => {
    const pathname = usePathname();
    if (!isActive) isActive = (pathname: string, href: string) => pathname === href;

    return (
        <Link href={href} className={`flex items-center px-3 py-2 self-stretch gap-2 rounded-lg hover:bg-primary-20 transition-colors duration-300 ease-in-out 
        ${isActive(pathname, href) ? 'bg-primary-100 dark:bg-primary-500 text-black dark:text-white dark:hover:bg-primary-400' : 'text-tertiary-500 dark:text-tertiary-400 dark:hover:bg-tertiary-900'}`}>
            {icon}
            <div>
                {label}
            </div>
        </Link>
    );
};

export default SidebarLink;
