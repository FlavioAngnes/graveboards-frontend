import React, {FC} from 'react';
import clsx from "clsx";

interface BeatmapsetStatusBadgeProps {
    // TODO: Replace with BeatmapsetStatus type
    status: "verified" | "unverified";
    truncate?: boolean;
}

const BeatmapsetStatusBadge: FC<BeatmapsetStatusBadgeProps> = ({status, truncate = false}) => {
    const statusColor = {
        verified: "bg-beatmapset-verified text-white",
        unverified: "bg-beatmapset-unverified text-black",
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

export default BeatmapsetStatusBadge;
