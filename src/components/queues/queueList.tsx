import React, {useEffect, useRef, useState} from 'react';
import QueuePanel from "@/components/queues/queuePanel";
import {QueueWithUsers} from "@/types/Queue";
import QueuePanelSkeleton from "@/components/queues/queuePanelSkeleton";

const QueueList = () => {
    const [queues, setQueues] = useState<QueueWithUsers[]>([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchUser = async (id: number) => {
            const response = await fetch(`/api/users/${id}`, {
                cache: 'no-store',
            });

            if (!response.ok) {
                console.error('Failed to fetch user');
                return null;
            }

            return response.json();
        }

        const fetchQueues = async (offset: number = 0, limit: number = 10) => {
            const response = await fetch(`/api/queues?limit=${limit}&offset=${offset}`, {
                cache: 'no-store',
            });

            if (!response.ok) {
                console.error('Failed to fetch queues');
                setIsLoading(false);
                setHasMore(false);
                return null;
            }

            const data: QueueWithUsers[] = await response.json();

            data.forEach((queue) => {
                fetchUser(queue.user_id).then((user) => {
                    queue.user = user;
                });

                queue.managers.forEach((managerId) => {
                    fetchUser(managerId).then((manager) => {
                        queue.managers_users.push(manager);
                    });
                });
            });

            return data;
        }

        setIsLoading(true);
        fetchQueues(offset).then(
            (newQueues) => {
                if (newQueues) {
                    setQueues((prev) => {
                        const newQueuesFiltered = newQueues.filter(
                            (newQueue) => !prev.some((prevBeatmap) => prevBeatmap.id === newQueue.id)
                        );
                        return [...prev, ...newQueuesFiltered];
                    });

                    setHasMore(newQueues.length > 0);
                } else {
                    setIsLoading(false);
                }
            }
        );
    }, [offset]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    setOffset((prev) => prev + 10);
                }
            },
            {threshold: 1.0}
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }
    }, [hasMore, isLoading]);

    return (
        <>
            {queues.map((queue) => (
                <QueuePanel key={queue.id} queue={queue}/>
            ))}
            {hasMore && <div ref={observerRef}>{<QueuePanelSkeleton/>}</div>}
        </>
    );
};

export default QueueList;
