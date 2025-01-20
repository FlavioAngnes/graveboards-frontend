import React, {FC} from 'react';
import RequestsContent from "@/components/requests/requestsContent";
import { verifySession } from "@/actions/session";
import { redirect } from "next/navigation";

const RequestsPage: FC = async () => {
    const session = await verifySession();

    if (!session?.userId) {
        redirect("/");
    }

    return (
        <RequestsContent />
    );
};

export default RequestsPage;
