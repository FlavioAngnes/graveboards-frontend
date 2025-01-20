import { redirect } from "next/navigation";
import { verifySession } from "@/actions/session";
import { CallbackContent } from "@/components/callback/callbackContent";

const CallbackPage = async () => {
    const session = await verifySession();

    if (!session?.userId) {
        redirect("/");
    }

    return (
        <CallbackContent />
    );
};

export default CallbackPage;
