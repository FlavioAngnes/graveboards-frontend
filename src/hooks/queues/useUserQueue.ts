import {useEffect, useState} from "react";
import {Queue} from "@/types/queue";
import { getQueueByUser } from "@/actions/queues";

const useUserQueue = (userId?: number) => {
    const [queue, setQueue] = useState<Queue>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        if (!userId) {
            setLoading(false);
            return;
        }

        getQueueByUser(userId)
            .then(data => {
                if (!data) {
                    setLoading(false);
                    setError("No queue found");
                    return;
                }

                setQueue(data[0]);
                setLoading(false);
            })
            .catch(e => {
                setLoading(false);
                setError(e.message);
            })
    }, [userId]);

    return {queue, loading, error}
}

export default useUserQueue;
