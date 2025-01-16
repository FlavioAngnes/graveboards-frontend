import React, {Dispatch, FC, SetStateAction} from "react";
import {MdGridView, MdOutlineViewAgenda} from "react-icons/md";
import clsx from "clsx";

interface ViewSwitchProps {
    view: "list" | "grid",
    setView: Dispatch<SetStateAction<"list"|"grid">>
}

export const ViewSwitch: FC<ViewSwitchProps> = ({view, setView}) => {
    return (
        <>
            <div className="block sm:hidden">
                <button
                    onClick={() => view === 'grid' ? setView('list') : setView('grid')}
                    className="p-1 h-9 rounded-lg text-primary-500 border-primary-500 hover:bg-tertiary-100 active:bg-tertiary-200 hover:dark:bg-tertiary-900 active:dark:bg-tertiary-800 flex items-center border-2 justify-center transition-colors duration-300 ease-in-out"
                >
                    <div className={`flex items-center gap-1.5 pr-1 ${view === 'grid' ? 'block' : 'hidden'}`}>
                        <MdGridView className={`size-5 ${view === 'grid' ? 'block' : 'hidden'}`}/>
                        Grid
                    </div>
                    <div className={`flex items-center gap-1.5 pr-1 ${view === 'list' ? 'block' : 'hidden'}`}>
                        <MdOutlineViewAgenda className={`size-5 ${view === 'list' ? 'block' : 'hidden'}`}/>
                        List
                    </div>
                </button>
            </div>
            <div className="hidden sm:flex gap-2">
                <button
                    onClick={() => setView('list')}
                    className={clsx(
                        `p-1 size-9 rounded-lg active:dark:border-tertiary-800 hover:bg-tertiary-100 active:bg-tertiary-200 hover:dark:bg-tertiary-900 active:dark:bg-tertiary-800 flex items-center border-2 justify-center transition-colors duration-300 ease-in-out`,
                        view === 'list' ? 'text-primary-500 border-primary-500' : 'text-tertiary-500 border-transparent'
                    )}>
                    <MdOutlineViewAgenda className="size-5"/>
                </button>
                <button
                    onClick={() => setView('grid')}
                    className={clsx(
                        `p-1 size-9 rounded-lg active:dark:border-tertiary-800 hover:bg-tertiary-100 active:bg-tertiary-200 hover:dark:bg-tertiary-900 active:dark:bg-tertiary-800 flex items-center border-2 justify-center transition-colors duration-300 ease-in-out`,
                        view === 'grid' ? 'text-primary-500 border-primary-500' : 'text-tertiary-500 border-transparent'
                    )}>
                    <MdGridView className="size-5"/>
                </button>
            </div>
        </>
    )
}
