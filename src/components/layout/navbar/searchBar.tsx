"use client";

import React, { useState } from "react";
import { MdFilterList, MdSearch } from "react-icons/md";

export function SearchBar() {
    const [isFiltersPopupVisible, setIsFiltersPopupVisible] = useState(false);

    const toggleFiltersPopup = () => setIsFiltersPopupVisible((prev) => !prev);

    return (
        <div
            className={`w-full justify-center flex overflow-hidden sm:grow gap-2 items-center border border-tertiary-500 dark:border-tertiary-900 dark:bg-tertiary-900 rounded-3xl h-12 px-[calc(0.25rem+1px)] transition-all duration-300`}>
            <div className="flex items-center pointer-events-auto size-9 justify-center rounded-full shrink-0">
                <MdSearch className="size-5 text-tertiary-500" />
            </div>
            <input
                type="text"
                placeholder="Search here..."
                className={`w-full appearance-none border-none outline-none bg-transparent placeholder-tertiary-500 dark:placeholder-tertiary-400 placeholder:tracking-wide transition-opacity duration-300`}
            />
            <button
                className={`flex items-center pointer-events-auto size-9 justify-center rounded-full shrink-0 hover:bg-tertiary-50 active:bg-tertiary-100 dark:hover:bg-tertiary-800 dark:active:bg-tertiary-700 transition-all duration-300 ease-in-out`}
                onClick={toggleFiltersPopup}>
                <MdFilterList className="size-6 text-tertiary-500" />
            </button>
{/*
            <div
                className={`fixed z-50 h-screen w-screen sm:w-72 drop-shadow-2xl top-0 left-0 m-0 sm:p-5 sm:bg-transparent transition-transform transform backdrop:bg-black ${isFiltersPopupVisible ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="bg-white w-full h-full rounded-xl">
                    <div className="flex items-center">
                        <div className="text-2xl font-medium">Filters</div>
                        <button onClick={toggleFiltersPopup}><GoX className="size-6" /></button>
                    </div>
                </div>
            </div>*/}
        </div>
    );
}
