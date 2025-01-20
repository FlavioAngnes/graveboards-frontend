interface PostRequest {
    beatmapset_id: number;
    comment: string;
    mv_checked: boolean;
    user_id: number;
    queue_id: number;
}

export const postRequest = async (request: PostRequest, init?: RequestInit): Promise<Response> => {
    const token = localStorage.getItem('token');

    if (token) {
        init = {
            ...init,
            headers: {
                ...init?.headers,
                Authorization: `Bearer ${token}`
            }
        }
    }

    console.log(request);

    return await fetch(`/api/requests`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        ...init
    });
}
