'use client'

import { useAuth } from "@/context/AuthContext";
import React from "react";
import { BeatmapsetsProvider } from "@/providers/beatmapsetsProvider";

const ManageRequestsContent = () => {
    const { isAdmin } = useAuth();

    if (!isAdmin) {
        return null;
    }

    return (
        <div className="flex flex-col gap-6">
            <BeatmapsetsProvider
                title="Unverified Beatmapsets"
                defaultFilters={[
                    {
                        value: 'beatmapset_filter.verified',
                        options: {
                            eq: false
                        },
                        isDefault: true
                    }
                ]}
                defaultSortingLayers={[
                    {
                        value: 'Request.created_at',
                        order: 'desc',
                        isDefault: true
                    }
                ]}
                editMode={true}
            />
        </div>
    );
};

export default ManageRequestsContent;
