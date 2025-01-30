import { FC } from "react";
import ManageRequestsContent from "@/components/requests/manage/manageRequestsContent";
import { verifySession } from "@/actions/session";
import { redirect } from "next/navigation";

const ManageRequestsPage: FC = async () => {
    const session = await verifySession();

    if (!session?.userId) {
        redirect("/");
    }

    return <ManageRequestsContent />;
};

export default ManageRequestsPage;

