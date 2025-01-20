"use client";

import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import RequestButton from "@/components/layout/navbar/requestButton";
import NavbarButton from "@/components/layout/navbar/navbarButton";
import { SearchBar } from "@/components/layout/navbar/searchBar";
import Button from "@/components/shared/button";
import { GoX } from "react-icons/go";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                className="flex flex-1 items-center gap-4 sm:px-5 sm:py-9 p-5 sticky top-0 z-20 backdrop-blur bg-white dark:bg-transparent dark:backdrop-brightness-[0.1]">
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    rounded="full"
                    variant="clear"
                    size="lg"
                    className="md:hidden px-4">
                    <FiMenu className="size-6" />
                </Button>
                <div className="flex flex-1 gap-4 justify-end items-center transition-all duration-300 overflow-hidden">
                    <SearchBar />

                    <RequestButton />

                    <NavbarButton />
                </div>
                <div className={`fixed z-50 h-screen w-screen sm:hidden drop-shadow-2xl top-0 left-0 m-0 dark:bg-black ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                        <div className="flex items-center">
                            <div className="text-2xl font-medium">Sidebar</div>
                            <button onClick={()=>setIsOpen(!isOpen)}><GoX className="size-6" /></button>
                        </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
