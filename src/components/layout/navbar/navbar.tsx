"use client";

import React from "react";
import { FiMenu } from "react-icons/fi";
import RequestButton from "@/components/layout/navbar/requestButton";
import NavbarButton from "@/components/layout/navbar/navbarButton";
import { SearchBar } from "@/components/layout/navbar/searchBar";
import Button from "@/components/shared/button";
import { useSidebar } from "@/context/layout/SidebarContext";

const Navbar = () => {
    const {toggleOpen} = useSidebar();

    return (
        <>
            <div
                className="flex flex-1 items-center gap-4 sm:px-5 sm:py-9 p-5 sticky top-0 z-20 backdrop-blur bg-white dark:bg-transparent dark:backdrop-brightness-[0.1]">
                <Button
                    onClick={toggleOpen}
                    rounded="full"
                    variant="clear"
                    size="lg"
                    className="md:hidden px-6">
                    <FiMenu className="size-6" />
                </Button>
                <div className="flex flex-1 gap-4 justify-end items-center transition-all duration-300 overflow-hidden">
                    <SearchBar />

                    <RequestButton />

                    <NavbarButton />
                </div>
            </div>
        </>
    );
};

export default Navbar;
