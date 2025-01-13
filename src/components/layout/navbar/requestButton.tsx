import React, {FC} from 'react';
import {GoLock} from "react-icons/go";
import {useAuth} from "@/context/AuthContext";
import {MdAdd} from "react-icons/md";
import Dialog from "@/components/shared/dialog";
import useDialog from "@/hooks/useDialog";
import Button from "@/components/shared/button";
import SelectQueues from "@/components/shared/selectQueues";

interface RequestButtonProps {
    isSearchExpanded: boolean;
}

const RequestButton: FC<RequestButtonProps> = ({isSearchExpanded}) => {
    const {isAuthenticated} = useAuth();

    const {ref, onOpen, onClose} = useDialog();

    return (
        <>
            {isAuthenticated ? (<Button
                onClick={onOpen}
                size="lg"
                rounded="3xl"
                className={`shrink-0 ${
                    isSearchExpanded ? 'min-w-12' : 'lg:min-w-80 min-w-40'
                }`}>
                <MdAdd className="size-6"/>
                {!isSearchExpanded && (
                    <>
                        <p className="lg:block hidden">Request a Map</p>
                        <p className="block lg:hidden">Request</p>
                    </>
                )}
            </Button>) : (
                <Button
                    size="lg"
                    rounded="3xl"
                    className={`shrink-0 ${
                        isSearchExpanded ? 'min-w-12' : 'lg:min-w-80 min-w-40'
                    }`} disabled>
                    <GoLock className="size-6"/>
                    {!isSearchExpanded && (
                        <>
                            <p className="lg:block hidden">Login to request</p>
                            <p className="block lg:hidden">Login</p>
                        </>
                    )}
                </Button>
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


