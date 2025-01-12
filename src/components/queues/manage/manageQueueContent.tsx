import React, {FC} from "react";
import useQueue from "@/hooks/useQueue";

export const ManageQueueContent: FC<{ id: number }> = ({id}) => {
    const {queue} = useQueue(id);

    if (!queue) {
        return null;
    }

    return (
        <div>Manage queue {id}</div>
    );
};
