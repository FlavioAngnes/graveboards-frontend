import React, { FC, ReactNode, useState } from "react";
import { BeatmapsetRequest } from "@/types/requests/request";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import clsx from "clsx";
import RequestPanel from "@/components/requests/panels/requestPanel";

interface RequestGroupProps {
    icon?: ReactNode;
    title: string;
    requests: BeatmapsetRequest[];
    view: "list" | "grid";
    editMode?: boolean;
}

const RequestGroup: FC<RequestGroupProps> = ({ icon, title, requests, view, editMode = false }) => {
    const [open, setOpen] = useState(true);

    return (
        <div className="flex flex-col gap-4">
            <button
                onClick={() => setOpen(prev => !prev)}
                className="flex items-center rounded-lg justify-between p-2.5 hover:dark:bg-tertiary-900 active:dark:bg-tertiary-800 transition-colors duration-300 ease-in-out">
                <div className="flex items-center gap-2">
                    {icon && (
                        <div className="size-5">
                            {icon}
                        </div>
                    )}
                    <div className="text-2xl font-bold truncate transition-all duration-300 ease-in-out">
                        {title}
                    </div>
                </div>
                {open ? (
                    <MdOutlineKeyboardArrowUp className="size-5" />
                ) : (
                    <MdOutlineKeyboardArrowDown className="size-5" />
                )}
            </button>

            {open && (
                <div
                    className={clsx(
                        "gap-4",
                        view === "grid" ? `grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))]` : `flex flex-col`
                    )}
                >
                    {requests.map(request => (
                        <RequestPanel requests={request} view={view} key={request.id} editMode={editMode} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RequestGroup;
