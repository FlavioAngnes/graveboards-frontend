import {NextRequest, NextResponse} from 'next/server';

const {API_URL} = process.env;

if (!API_URL) {
    throw new Error(
        'Please define the API_URL environment variable inside .env.local'
    )
}

export async function GET(request: NextRequest) {
    try {
        const headers = request.headers;

        if (!headers.get('Authorization')) {
            return NextResponse.json(
                {error: 'Unauthorized request'},
                {status: 401}
            );
        }

        const searchParams = request.nextUrl.searchParams;

        const limit = searchParams.get('limit') || 10;
        const offset = searchParams.get('offset') || 0;

        if (Number(limit) > 50) {
            return NextResponse.json(
                {error: 'Limit must be less than or equal to 50.'},
                {status: 400}
            );
        }

        const response = await fetch(`${API_URL}/requests?${searchParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${headers.get('Authorization')}`,
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                {error: 'Failed to fetch users from backend.'},
                {status: 500}
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {error: 'Failed to fetch users from backend.'},
            {status: 500}
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const headers = request.headers;

        if (!headers.get('Authorization')) {
            return NextResponse.json(
                {error: 'Unauthorized request'},
                {status: 401}
            );
        }

        const body = await request.json();

        const response = await fetch(`${API_URL}/requests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${headers.get('Authorization')}`,
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            return NextResponse.json(
                {error: 'Failed to post request to backend.'},
                {status: 500}
            );
        }

        return NextResponse.json(await response.json());
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {error: 'Failed to post request to backend.'},
            {status: 500}
        );
    }
}
