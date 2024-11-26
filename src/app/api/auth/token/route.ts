import {NextResponse} from 'next/server';

const {API_URL} = process.env;

if (!API_URL) {
    throw new Error(
        'Please define the BACKEND_URL environment variable inside .env.local'
    )
}

interface TokenRequest {
    code: string;
    state: string;
}

export interface TokenResponse {
    token: string;
    user_id: string;
}

export async function POST(request: Request) {
    try {
        const body: TokenRequest = await request.json();

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
