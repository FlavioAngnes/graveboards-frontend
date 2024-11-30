import {NextResponse} from 'next/server';

const {API_URL} = process.env;

if (!API_URL) {
    throw new Error(
        'Please define the BACKEND_URL environment variable inside .env.local'
    )
}

export interface TokenRequest {
    token: string;
}

export interface TokenResponse {
    token: string;
    user_id: string;
}

interface PostTokenRequest {
    code: string;
    state: string;
}

export interface PostTokenResponse {
    token: string;
    user_id: string;
}

export async function GET(request: Request) {
    try {
        const token = new URL(request.url).searchParams.get('token');

        if (!token) {
            return NextResponse.json(
                {error: 'Bad Request.'},
                {status: 400}
            );
        }

        const response = await fetch(`${API_URL}/token?token=${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                {error: 'Unable to exchange token'},
                {status: 500}
            );
        }

        const data: TokenResponse = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {error: 'Unable to exchange token'},
            {status: 500}
        );
    }
}

export async function POST(request: Request) {
    try {
        const body: PostTokenRequest = await request.json();

        const {code, state} = body;

        if (!code || !state) {
            return NextResponse.json(
                {error: 'Invalid request body.'},
                {status: 400}
            );
        }

        const response = await fetch(`${API_URL}/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({code, state}).toString(),
        });

        if (!response.ok) {
            return NextResponse.json(
                {error: 'Unable to exchange token'},
                {status: 500}
            );
        }

        const data: PostTokenResponse = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {error: 'Unable to exchange token'},
            {status: 500}
        );
    }
}
