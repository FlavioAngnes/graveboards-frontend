import {useEffect, useState} from "react";
import {Queue} from "@/types/queue";
import {getQueues} from "@/services/queueService";

interface QueueOptions {
    limit?: number;
    offset?: number;
}

const useQueues = (page: number) => {
    const [queues, setQueues] = useState<Queue[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(false);

    useEffect(() => {
        const options: QueueOptions = {
        }

        setLoading(true);
        setError(null);

        const controller = new AbortController();
        const {signal} = controller;

        getQueues(page, options, {signal})
            .then(data => {
                if (page === 0) {
                    setQueues(data);
                } else {
                    setQueues((prev) => [...prev, ...data]);
                }
                setHasMore(!!data.length && data.length === 10);
                setLoading(false);
            })
            .catch(e => {
                setLoading(false);
                if (signal.aborted) return;
                setError(e.message);
            })

        return () => controller.abort();
    }, [page]);

    return {queues, loading, error, hasMore}
}

export default useQueues;
