import {useEffect, useState} from "react";
import {Queue} from "@/types/queue";
import {getQueue} from "@/services/queueService";

const useQueue = (id: number) => {
    const [queue, setQueue] = useState<Queue>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const controller = new AbortController();
        const {signal} = controller;

        getQueue(id, {signal})
            .then(data => {
                setQueue(data);
                setLoading(false);
            })
            .catch(e => {
                setLoading(false);
                if (signal.aborted) return;
                setError(e.message);
            })

        return () => controller.abort();
    }, [id]);

    return {queue, loading, error}
}

export default useQueue;
