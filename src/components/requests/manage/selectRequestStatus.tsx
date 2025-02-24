import React, {FC, useState} from 'react';
import RequestStatusBadge from "@/components/requests/badge/requestStatusBadge";
import { RequestStatus, RequestStatuses } from "@/types/requests/request";
import { FaCircleNotch } from "react-icons/fa6";
import Select from "@/components/shared/select";

interface SelectRequestStatusProps {
    initialStatus: RequestStatus;
    disabled?: boolean;
    isPending?: boolean;
    name?: string;
    onSelect?: (status: RequestStatus) => void;
}

const SelectRequestStatus: FC<SelectRequestStatusProps> = ({initialStatus, disabled, isPending, onSelect}) => {
    const [status, setStatus] = useState<RequestStatus>(initialStatus);

    const handleSelect = (newStatus: RequestStatus) => {
        setStatus(newStatus);
        if (onSelect) onSelect(newStatus);
    };

    return (
        <>
            <Select
                items={[...Object.values(RequestStatuses)]}
                renderItem={(item) => (
                    <div className="flex items-center gap-1">
                        <RequestStatusBadge status={item} truncate={true}/>

                        {isPending && (
                            <div className="items-center justify-center flex ml-1.5">
                                <FaCircleNotch className="size-4 animate-spin"/>
                            </div>
                        )}
                    </div>
                )}
                onItemSelect={(item) => handleSelect(item || RequestStatuses.Pending)}
                selected={Object.values(RequestStatuses).find((s) => s === status)}
                isSelected={(item) => item === status}
                className={"w-full sm:w-auto"}
                disabled={disabled || isPending}
            />
        </>
    );
};

export default SelectRequestStatus;
