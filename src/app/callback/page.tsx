import { redirect } from "next/navigation";
import { CallbackContent } from "@/components/callback/callbackContent";

const CallbackPage = async ({
                                searchParams,
                            }: {
    searchParams: Promise<{ code: string | null; state: string | null; error: string | null }>;
}) => {
    const { code, state, error } = await searchParams;

    if (error || !code || !state) {
        redirect("/");
    }

    return (
        <CallbackContent code={code} state={state} />
    );
};

export default CallbackPage;
