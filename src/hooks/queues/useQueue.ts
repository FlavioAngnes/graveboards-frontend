import {useEffect, useState} from "react";
import {Queue} from "@/types/queue";
import {getQueue} from "@/actions/queues";

const useQueue = (id: number) => {
    const [queue, setQueue] = useState<Queue>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        getQueue(id)
            .then(data => {
                setQueue(data);
                setLoading(false);
            })
            .catch(e => {
                setLoading(false);
                setError(e.message);
            })
    }, [id]);

    return {queue, loading, error}
}

export default useQueue;
