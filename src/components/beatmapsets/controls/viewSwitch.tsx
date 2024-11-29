import React, {Dispatch, FC, SetStateAction} from "react";
import {MdGridView, MdOutlineViewAgenda} from "react-icons/md";

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
                    className={`p-1 rounded-lg hover:bg-tertiary-100 active:bg-tertiary-200 hover:dark:bg-tertiary-900 active:dark:bg-tertiary-800 flex sm:hidden items-center border-2 text-primary-500 border-primary-500 justify-center transition-colors duration-300 ease-in-out`}>
                    <MdGridView className={`size-5 ${view === 'grid' ? 'block' : 'hidden'}`}/>
                    <MdOutlineViewAgenda className={`size-5 ${view === 'list' ? 'block' : 'hidden'}`}/>
                </button>
            </div>
            <div className="hidden sm:flex gap-2">
                <button
                    onClick={() => setView('list')}
                    className={`p-1 rounded-lg hover:bg-tertiary-100 active:bg-tertiary-200 hover:dark:bg-tertiary-900 active:dark:bg-tertiary-800 flex items-center border-2 justify-center transition-colors duration-300 ease-in-out
                            ${view === 'list' ? `text-primary-500 border-primary-500` : `text-tertiary-500 border-transparent hover:dark:border-tertiary-900 active:dark:border-tertiary-800`}`}>
                    <MdOutlineViewAgenda className="size-5"/>
                </button>
                <button
                    onClick={() => setView('grid')}
                    className={`p-1 rounded-lg hover:bg-tertiary-100 active:bg-tertiary-200 hover:dark:bg-tertiary-900 active:dark:bg-tertiary-800 flex items-center border-2 justify-center transition-colors duration-300 ease-in-out
                            ${view === 'grid' ? `text-primary-500 border-primary-500` : `text-tertiary-500 border-transparent hover:dark:border-tertiary-900 active:dark:border-tertiary-800`}`}>
                    <MdGridView className="size-5"/>
                </button>
            </div>
        </>
    )
}
