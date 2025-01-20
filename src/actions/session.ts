import "server-only";
import { TokenResponse } from "@/actions/auth";
import { cookies } from "next/headers";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { User } from "@/types/user";

interface Session extends JWTPayload {
    userId: string;
    user: User;
    token: string;
    expires: Date;
}

const key = new TextEncoder().encode(process.env.JWT_SECRET);

export const decrypt = async (session?: string) => {
    try {
        if (!session) {
            return null;
        }

        const { payload } = await jwtVerify(session, key, {algorithms: ["HS256"]});

        return payload;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const encrypt = async (payload: JWTPayload) => {
    return new SignJWT(payload)
        .setProtectedHeader({alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime('1day')
        .sign(key)
}

export const createSession = async (data: TokenResponse) => {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({
        userId: data.user_id,
        token: data.token,
        expires
    });

    (await cookies()).set("session", session, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        expires: expires,
    });
};

export const verifySession = async () => {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    if (!session?.userId) {
        return null;
    }

    return session as Session;
}

export const deleteSession = async () => {
    const cookieStore = await cookies();

    cookieStore.delete("session");
}
