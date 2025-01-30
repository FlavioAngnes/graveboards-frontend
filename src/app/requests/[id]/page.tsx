import React from "react";
import { verifySession } from "@/actions/session";
import { redirect } from "next/navigation";

const RequestPage = async () => {
    const session = await verifySession();

    if (!session?.userId) {
        redirect("/");
    }

    return (
        <div>
            Request Page
        </div>
    );
};

export default RequestPage;
