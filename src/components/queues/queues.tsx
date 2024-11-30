import React, {useEffect, useRef, useState} from 'react';
import QueuePanel from "@/components/queues/queuePanel";
import QueuePanelSkeleton from "@/components/queues/queuePanelSkeleton";
import useQueues from "@/hooks/useQueues";

const Queues = () => {
    const [page, setPage] = useState(0);

    const {queues, hasMore, loading, error} = useQueues(page);

    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (loading || !observerRef.current) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1);
            }
        }, {
            threshold: 0.5
        });

        observer.observe(observerRef.current);

        return () => {
            observer.disconnect();
        }
    }, [loading, hasMore]);

    if (error) {
        return (
            <div className="text-center text-2xl font-semibold text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {queues.map((queue) => (
                    <QueuePanel key={queue.id} queue={queue}/>
                )
            )}

            {(loading || hasMore) && (
                <div ref={observerRef}>
                    <QueuePanelSkeleton/>
                </div>
            )}
        </div>
    );
};

export default Queues;
