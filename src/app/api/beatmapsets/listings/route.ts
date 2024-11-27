import {NextRequest, NextResponse} from 'next/server';

const {API_URL} = process.env;

if (!API_URL) {
    throw new Error(
        'Please define the API_URL environment variable inside .env.local'
    )
}

interface LoginResponse {
    authorization_url: string;
    state: string;
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        const limit = searchParams.get('limit') || 10;

        if (Number(limit) > 50) {
            return NextResponse.json(
                {error: 'Limit must be less than or equal to 50.'},
                {status: 400}
            );
        }

        const response = await fetch(`${API_URL}/beatmapsets/listings?${searchParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                {error: 'Failed to fetch beatmapsets from backend.'},
                {status: 500}
            );
        }

        const data: LoginResponse = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {error: 'Failed to fetch beatmapsets from backend.'},
            {status: 500}
        );
    }
}
