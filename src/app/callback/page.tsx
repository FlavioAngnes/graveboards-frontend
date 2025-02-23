import { CallbackContent } from "@/components/callback/callbackContent";
import { Suspense } from "react";

const CallbackPage = async () => {
    return (
        <Suspense>
            <CallbackContent />
        </Suspense>
    );
};

export default CallbackPage;
