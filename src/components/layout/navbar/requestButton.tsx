import React, {FC} from 'react';
import {GoLock} from "react-icons/go";
import {useAuth} from "@/context/AuthContext";
import {MdAdd} from "react-icons/md";

interface RequestButtonProps {
    isSearchExpanded: boolean;
}

const RequestButton: FC<RequestButtonProps> = ({isSearchExpanded}) => {
    const {isAuthenticated} = useAuth();

    const {ref, onOpen, onClose} = useDialog();

    return (
        <>
            {isAuthenticated ? (<button
                className={`gap-2 items-center overflow-hidden justify-center text-white bg-primary-500 rounded-3xl h-12 flex shrink-0 transition-all duration-300 ${
                    isSearchExpanded ? 'min-w-12' : 'lg:min-w-80 min-w-40'
                }`}>
                <MdAdd className="size-6"/>
                {!isSearchExpanded && (
                    <>
                        <p className="lg:block hidden">Request a Map</p>
                        <p className="block lg:hidden">Request</p>
                    </>
                )}
            </button>) : (
                <button
                    className={`gap-2 items-center overflow-hidden justify-center text-tertiary-600 bg-tertiary-200 dark:text-tertiary-900 dark:bg-tertiary-500 rounded-3xl h-12 flex shrink-0 transition-all duration-300 ${
                        isSearchExpanded ? 'min-w-12' : 'lg:min-w-80 min-w-40'
                    }`} disabled>
                    <GoLock className="size-6"/>
                    {!isSearchExpanded && (
                        <>
                            <p className="lg:block hidden">Login to request</p>
                            <p className="block lg:hidden">Login</p>
                        </>
                    )}
                </button>
            )}
            <Dialog title={"Request a Map"} ref={ref} onClose={onClose}>
                <form className="flex flex-col gap-3 mt-2">
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold dark:text-white">
                            Beatmap Link<span className="text-red-500">*</span>
                        </span>
                        <input
                            className=
                                'w-full sm:w-auto placeholder-tertiary-500 dark:placeholder-tertiary-400 whitespace-nowrap p-2 rounded-lg dark:bg-tertiary-900 outline-none border-[1px] flex items-center justify-between gap-1 transition-colors duration-300 ease-in-out focus:border-primary-500 focus:bg-tertiary-100 focus:dark:bg-tertiary-800 border-tertiary-300 dark:border-tertiary-700'
                            type="text"
                            placeholder="Beatmap Link"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold dark:text-white">
                            BN Queue<span className="text-red-500">*</span>
                        </span>
                        <SelectQueues/>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="font-semibold dark:text-white">
                            Comment
                        </span>
                        <textarea
                            className=
                                'w-full sm:w-auto placeholder-tertiary-500 dark:placeholder-tertiary-400 whitespace-nowrap p-2 rounded-lg dark:bg-tertiary-900 outline-none border-[1px] flex items-center justify-between gap-1 transition-colors duration-300 ease-in-out focus:border-primary-500 focus:bg-tertiary-100 focus:dark:bg-tertiary-800 border-tertiary-300 dark:border-tertiary-700'
                            placeholder="Comment"
                        />
                    </div>
                </form>
                <footer className="flex justify-end gap-2 mt-2">
                    <Button
                        rounded="lg"
                        className="px-4 py-2"
                    >
                        Request
                    </Button>
                </footer>
            </Dialog>
        </>
    );
};

export default RequestButton;


