import React, {FC} from 'react';
import clsx from "clsx";

interface RequestStatusBadgeProps {
    // TODO: Replace with RequestStatus type
    status: "pending" | "accepted" | "rejected";
    truncate?: boolean;
}

const RequestStatusBadge: FC<RequestStatusBadgeProps> = ({status, truncate = false}) => {
    const statusColor = {
        pending: "bg-request-pending text-white",
        accepted: "bg-request-accepted text-white",
        rejected: "bg-request-rejected text-white",
    }[status];

    return (
        <div
            className={clsx(
                `${statusColor} rounded-full font-bold text-xs block h-5 leading-5 text-center`,
                truncate ? "w-5 xl:w-auto xl:px-2.5" : "w-auto px-2.5",
            )}>
            <span className={clsx({"hidden xl:inline": truncate})}>
                {status.toUpperCase()}
            </span>

            {truncate && (
                <span className="xl:hidden">
                {status.charAt(0).toUpperCase()}
            </span>
            )}
        </div>
    );
};

export default RequestStatusBadge;
