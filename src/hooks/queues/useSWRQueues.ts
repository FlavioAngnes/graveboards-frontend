import { Queue } from "@/types/queue";
import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/utils/fetcher";

interface QueueOptions {
    limit?: number;
    offset?: number;
}

const useSWRQueues = ({ limit, offset }: QueueOptions) => {
    const getKey = (pageIndex: number) => {
        const searchParams = new URLSearchParams();

        // Add pagination
        limit = limit || 10;
        offset = (offset || 0) + pageIndex * limit;

        searchParams.append("limit", limit.toString());
        searchParams.append("offset", offset.toString());

        return `/api/queues?${searchParams}`;
    };

    const {
        data,
        error,
        isLoading,
        isValidating,
        mutate,
        size,
        setSize
    } = useSWRInfinite<Queue[]>(getKey, fetcher);

    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd = isEmpty || Boolean(data && data[data.length - 1]?.length < (limit || 10));

    return { queues: data ? data.flat() : [], error, isLoading, isValidating, mutate, size, setSize, isReachingEnd };
};

export default useSWRQueues;
