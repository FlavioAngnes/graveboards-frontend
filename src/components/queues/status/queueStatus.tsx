import React, { FC } from "react";
import { MdCircle } from "react-icons/md";

interface QueueStatusProps {
    isOpen: boolean;
}

const QueueStatus: FC<QueueStatusProps> = ({ isOpen }) => {
    const statuses = [
        { value: 1, label: "Open", colorClass: "text-green-500" },
        { value: 0, label: "Closed", colorClass: "text-red-500" }
    ];

    return (
        <div
            className={`flex items-center gap-1.5 ${statuses.find(s => Boolean(s.value) === isOpen)?.colorClass || "text-tertiary-500"}`}>
            <MdCircle className="size-4" />
            <p>{statuses.find(s => Boolean(s.value) === isOpen)?.label || "Unknown"}</p>
        </div>
    );
};

export default QueueStatus;
