import React, { FC, useEffect, useState } from "react";
import useSWRQueues from "@/hooks/queues/useSWRQueues";
import QueueChip from "@/components/shared/queueChip";
import { Queue } from "@/types/queue";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import Select from "@/components/shared/select";

interface SelectQueuesProps {
    onSelect: (queues: number[]) => void;
}

const SelectQueues: FC<SelectQueuesProps> = ({ onSelect }) => {
    const params = useParams<{ id: string }>();

    const [selected, setSelected] = useState<Queue[]>([]);

    const { queues, isReachingEnd, size, setSize } = useSWRQueues({ limit: 10, is_open: true });
    const { data: queue } = useSWR<Queue>(`/api/queues/${Number(params.id) || 1}`, fetcher);

    const isSelected = (queue: Queue) => selected.some(q => q.id === queue.id);

    const handleRemove = (queue: Queue) => {
        onSelect(selected.filter(q => q.id !== queue.id).map(queue => queue.id));
        setSelected(selected.filter(q => q.id !== queue.id));
    };

    const handleSelect = (queue: Queue) => {
        if (isSelected(queue)) {
            handleRemove(queue);
        } else {
            setSelected([...selected, queue]);
            onSelect([...selected, queue].map(queue => queue.id));
        }
    };

    useEffect(() => {
        if (queue) {
            if (queue.is_open) {
                setSelected([queue]);
                onSelect([queue.id]);
            } else {
                setSelected([]);
                onSelect([]);
            }
        }
    }, [queue, onSelect]);

    return (
        <Select
            items={queues}
            onItemSelect={(queue) => handleSelect(queue as Queue)}
            renderItem={(queue) => (
                <div className="flex items-center gap-1.5">
                    <div
                        className="size-4 bg-gray-500 rounded-full bg-cover"
                        style={{ backgroundImage: `url(${queue.user_profile.avatar_url})` }}></div>
                    {queue.name}
                </div>
            )}
            renderSelected={(queue) => (
                <QueueChip key={queue.id} queue={queue} removeQueue={handleRemove} />
            )}
            selected={selected}
            isSelected={(queue) => isSelected(queue)}
            placeholder={"Select Queue(s)"}
            footer={
                !isReachingEnd &&
                <button
                  type="button"
                  onClick={() => setSize(size + 1)}
                  className="p-2 text-tertiary-500 dark:text-tertiary-400 hover:bg-tertiary-200 active:bg-tertiary-300 dark:hover:bg-tertiary-800 active:dark:bg-tertiary-700 transition-colors duration-300 ease-in-out">
                  Load More
                </button>
            }
            className={"w-full"}
        />
    );
};

export default SelectQueues;
