import React, {FC} from 'react';
import {GoX} from "react-icons/go";
import {Queue} from "@/types/queue";

interface QueueChipProps {
    queue: Queue;
    removeQueue: (queue: Queue) => void;
}

const QueueChip: FC<QueueChipProps> = ({queue, removeQueue}) => {
    return (
        <div className="flex rounded-full overflow-hidden text-sm tracking-wide">
            <div className="flex items-center gap-1 py-0.5 pl-1.5 pr-1.5 bg-tertiary-50 dark:bg-tertiary-800 text-black dark:text-white">
                <div
                   className="size-4 bg-gray-500 rounded-full bg-cover"
                   style={{backgroundImage: `url(${queue.user_profile.avatar_url})`}}></div>
                {queue.name}
            </div>
            <div
                onClick={(event) => {
                    event.stopPropagation();
                    removeQueue(queue);
                }}
                className="flex items-center py-0.5 pr-1.5 bg-tertiary-50 dark:bg-tertiary-800 text-black dark:text-white">
                <GoX/>
            </div>
        </div>
    );
};

export default QueueChip;
