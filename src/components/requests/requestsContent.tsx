"use client";

import React from "react";
import { RequestsProvider } from "@/providers/requestsProvider";
import { useAuth } from "@/context/AuthContext";


const RequestsContent = () => {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    return (
            <div className="flex flex-col gap-6">
                <RequestsProvider
                    title="My Requests"
                    defaultFilters={[
                        {
                            value: 'request_filter.user_id',
                            options: {
                                eq: user.id
                            },
                            isDefault: true
                        }
                    ]}
                    defaultSortingLayers={
                        [
                            {
                                value: 'Request.created_at',
                                order: 'desc',
                                isDefault: true
                            }
                        ]
                    }
                />
            </div>
    );
};

export default RequestsContent;
