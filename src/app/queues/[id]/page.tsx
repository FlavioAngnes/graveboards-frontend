import React, {FC} from 'react';

interface QueuePageProps {
    params: Promise<{ id: string }>;
}

const QueuePage: FC<QueuePageProps> = async ({params}) => {
    const id = (await params).id;

    return (
        <div>
            <h1>Queue {id}</h1>
        </div>
    );
};

export default QueuePage;
