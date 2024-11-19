"use client";

import React, {useRef} from 'react';
import {GoX} from "react-icons/go";

const Dialog = ({title, children}: Readonly<{
    title: string;
    children: React.ReactNode;
}>) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    return (
        <dialog ref={dialogRef} className="fixed z-50 h-screen top-0 left-0 m-0 p-5 bg-transparent">
            <div className="bg-white w-full h-full rounded-xl">
                <div className="flex items-center">
                    <div className="text-2xl font-medium">{title}</div>
                    <button onClick={() => dialogRef.current?.close()}><GoX className="size-6"/></button>
                </div>
                {children}
            </div>
        </dialog>
    );
};

export default Dialog;
