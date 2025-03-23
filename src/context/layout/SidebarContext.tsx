"use client";

import React, { createContext, useContext, useState, ReactNode, FC } from "react";

interface SidebarContextType {
    open: boolean;
    toggleOpen: () => void;
}

export const SidebarContext = createContext<SidebarContextType>({
    open: false,
    toggleOpen: () => {}
});

export const SidebarProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen(!open);

    return (
        <SidebarContext.Provider value={{ open, toggleOpen }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
