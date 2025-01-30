import {useEffect, useState} from "react";
import {Queue} from "@/types/queue";
import {getQueues} from "@/actions/queues";

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

        getQueues(page, options)
            .then(data => {
                if (!data) {
                    setLoading(false);
                    return;
                }

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
                setError(e.message);
            })
    }, [page]);

    return {queues, loading, error, hasMore}
}

export default useQueues;
