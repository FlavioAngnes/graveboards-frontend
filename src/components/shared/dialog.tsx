"use client";

import React, {forwardRef, MouseEventHandler} from 'react';
import {GoX} from "react-icons/go";

interface DialogProps {
    title: string;
    onClose: MouseEventHandler<HTMLButtonElement>;
    children?: React.ReactNode;
}

const Dialog = forwardRef<HTMLDialogElement, DialogProps>(({title, onClose, children}, ref) => {
    return (
        <dialog ref={ref} className="bg-white max-w-[100vw] max-h-[100vh] h-screen w-screen sm:h-max sm:w-max overflow-y-scroll sm:overflow-hidden overflow-x-hidden dark:bg-tertiary-900 text-black dark:text-white p-6 sm:rounded-xl">
            <div className="flex flex-col gap-2">
                <header className="flex items-center justify-between gap-2">
                    <div className="text-2xl font-medium">{title}</div>
                    <button onClick={onClose}><GoX className="size-6"/></button>
                </header>
                {children}
            </div>
        </dialog>
    );
});

Dialog.displayName = 'Dialog';

export default Dialog;
