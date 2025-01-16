import {NextResponse} from 'next/server';

const {API_URL} = process.env;

if (!API_URL) {
    throw new Error(
        'Please define the API_URL environment variable inside .env.local'
    )
}

export async function GET(request: Request, { params }: { params: Promise<{id: string;}>}) {
    try {
        const id = (await params).id;

        const response = await fetch(`${API_URL}/profiles/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                {error: 'Failed to fetch profile from backend.'},
                {status: 500}
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {error: 'Failed to fetch profile from backend.'},
            {status: 500}
        );
    }
}
