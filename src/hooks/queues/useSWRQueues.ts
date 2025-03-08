import { Queue } from "@/types/queue";
import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/utils/fetcher";
import { Pagination } from "@/types/beatmapsets/beatmapset"

interface QueueOptions extends Pagination {
    is_open?: boolean;
}

const useSWRQueues = ({ limit, offset, is_open }: QueueOptions) => {
    const getKey = (pageIndex: number) => {
        const searchParams = new URLSearchParams();

        // Add pagination
        limit = limit || 10;
        offset = (offset || 0) + pageIndex * limit;

        searchParams.append("limit", limit.toString());
        searchParams.append("offset", offset.toString());

        // Add filter
        if (is_open !== undefined) {
            searchParams.append("is_open", is_open.toString());
        }

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
