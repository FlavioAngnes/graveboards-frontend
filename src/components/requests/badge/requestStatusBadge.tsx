import React, {FC} from 'react';
import clsx from "clsx";
import { RequestStatus } from "@/types/requests/request";

interface RequestStatusBadgeProps {
    status: RequestStatus;
    truncate?: boolean;
}

const RequestStatusBadge: FC<RequestStatusBadgeProps> = ({status, truncate = false}) => {
    const statusColor = {
        0: "bg-request-pending text-white",
        '-1': "bg-request-rejected text-white",
        1: "bg-request-accepted text-white",
    }[status];

    return (
        <div
            className={clsx(
                `${statusColor} rounded-full font-bold text-xs block h-5 leading-5 text-center`,
                truncate ? "w-5 xl:w-auto xl:px-2.5" : "w-auto px-2.5",
            )}>
            <span className={clsx({"hidden xl:inline": truncate})}>
                {(status === 0 ? "Pending" : status === 1 ? "Accepted" : "Rejected").toUpperCase()}
            </span>

            {truncate && (
                <span className="xl:hidden">
                {status === 0 ? "P" : status === 1 ? "A" : "R"}
            </span>
            )}
        </div>
    );
};

export default RequestStatusBadge;
