'use client';

import React, {FC} from 'react';

interface SidebarSectionProps {
    label: string;
    children?: React.ReactNode;
}

const SidebarSection: FC<SidebarSectionProps> = ({label, children}) => {
    return (
        <div className="flex flex-col w-full gap-6">
            <div className="flex flex-col flex-1">
                <div className="font-bold tracking-wide px-3 mb-4 dark:text-tertiary-400 text-tertiary-500">
                    {label}
                </div>
                <div className="flex flex-col gap-1">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default SidebarSection;
