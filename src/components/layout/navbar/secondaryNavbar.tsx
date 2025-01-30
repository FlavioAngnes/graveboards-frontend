'use client';

import React, {FC} from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";
import clsx from "clsx";

interface SecondaryNavbarProps {
    items: {
        name: string;
        href: string;
    }[];
}

const SecondaryNavbar: FC<SecondaryNavbarProps> = ({items}) => {
    const pathname = usePathname();
    const isActive = (href: string) => pathname.startsWith(href);

    return (
        <div
            className="flex flex-1 border-b-[1px] justify-center border-tertiary-200 dark:border-tertiary-800 items-center gap-6 sticky top-0 z-10 backdrop-blur bg-white dark:bg-transparent dark:backdrop-brightness-[0.1]">
            {
                items.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className={clsx(
                            `group relative h-8 transition-colors duration-300 ease-in-out`,
                            isActive(item.href) ? 'text-primary-500 hover:dark:text-primary-400' : 'text-tertiary-400 hover:text-tertiary-500 dark:text-tertiary-600'
                        )}>
                        {item.name}
                        <div className={clsx(
                            `group-hover:visible h-[5px] bg-primary-500 absolute -bottom-[3px] rounded-full w-full transition-colors duration-300 ease-in-out`,
                            isActive(item.href) ? 'visible' : 'invisible'
                        )}></div>
                    </Link>
                ))
            }
        </div>

    );
};

export default SecondaryNavbar;
