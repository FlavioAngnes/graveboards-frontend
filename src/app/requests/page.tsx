'use client';

import React, {FC} from 'react';
import {RequestsProvider} from "@/providers/requestsProvider";
import {useAuth} from "@/context/AuthContext";

const Requests: FC = () => {
    const {user} = useAuth();

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
            />
        </div>
    );
};

export default Requests;
