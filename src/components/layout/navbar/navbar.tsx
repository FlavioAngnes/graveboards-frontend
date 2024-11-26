'use client';

import React, {useState} from 'react';
import {GoX} from "react-icons/go";
import Dialog from "@/components/shared/dialog";
import {FiMenu} from "react-icons/fi";
import RequestButton from "@/components/layout/navbar/requestButton";
import ProfileButton from "@/components/layout/navbar/profileButton";
import {MdFilterList, MdSearch} from "react-icons/md";

const Navbar = () => {
    const [isFiltersPopupVisible, setIsFiltersPopupVisible] = useState(false);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);

    const toggleFiltersPopup = () => setIsFiltersPopupVisible((prev) => !prev);
    const toggleSearch = () => setIsSearchExpanded((prev) => !prev);

    return (
        <>
            <div
                className="flex flex-1 items-center gap-4 sm:px-5 sm:py-9 p-5 sticky top-0 z-10 backdrop-blur bg-white dark:bg-transparent dark:backdrop-brightness-[0.1]">
                <button className="md:hidden text-black dark:text-white">
                    <FiMenu className="size-6"/>
                </button>
                <div
                    className={`flex flex-1 gap-4 justify-end items-center transition-all duration-300 overflow-hidden`}>
                    <div
                        className={`flex overflow-hidden sm:grow gap-2 items-center border border-tertiary-500 dark:border-tertiary-900 dark:bg-tertiary-900 rounded-3xl h-12 px-[calc(0.25rem+1px)] ${
                            isSearchExpanded ? 'w-full justify-center' : 'w-12'
                        } transition-all duration-300`}>
                        <button
                            className="flex items-center pointer-events-auto size-9 justify-center rounded-full shrink-0 hover:bg-tertiary-50 active:bg-tertiary-100 dark:hover:bg-tertiary-800 dark:active:bg-tertiary-700 transition-colors duration-300 ease-in-out"
                            onClick={toggleSearch}>
                            <MdSearch className="size-5 text-tertiary-500"/>
                        </button>
                        <input
                            type="text"
                            placeholder="Search here..."
                            className={`w-full appearance-none border-none outline-none bg-transparent placeholder-tertiary-500 dark:placeholder-tertiary-400 placeholder:tracking-wide ${
                                isSearchExpanded ? 'opacity-100' : 'opacity-0 sm:opacity-100'
                            } transition-opacity duration-300`}
                        />
                        <button
                            className={`flex items-center pointer-events-auto size-9 justify-center rounded-full shrink-0 hover:bg-tertiary-50 active:bg-tertiary-100 dark:hover:bg-tertiary-800 dark:active:bg-tertiary-700 transition-all duration-300 ease-in-out ${
                                isSearchExpanded ? 'opacity-100' : 'opacity-0 sm:opacity-100'}`}
                            onClick={toggleFiltersPopup}>
                            <MdFilterList className="size-6 text-tertiary-500"/>
                        </button>
                    </div>

                    <RequestButton isSearchExpanded={isSearchExpanded}/>

                    <ProfileButton/>
                </div>
            </div>
            <div
                className={`fixed z-50 h-screen w-screen sm:w-72 drop-shadow-2xl top-0 left-0 m-0 sm:p-5 sm:bg-transparent transition-transform transform backdrop:bg-black ${isFiltersPopupVisible ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="bg-white w-full h-full rounded-xl">
                    <div className="flex items-center">
                        <div className="text-2xl font-medium">Filters</div>
                        <button onClick={toggleFiltersPopup}><GoX className="size-6"/></button>
                    </div>
                </div>
            </div>
            <Dialog title="Filters"/>
        </>

    );
};

export default Navbar;
