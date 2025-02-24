import React, {FC, useState} from 'react';
import BeatmapsetStatusBadge from "@/components/beatmapsets/badge/beatmapsetStatusBadge";
import Select from "@/components/shared/select";

const statuses = ["verified", "unverified"] as const;

type BeatmapsetStatus = typeof statuses[number];

interface SelectBeatmapsetStatusProps {
    initialStatus: BeatmapsetStatus;
    disabled?: boolean;
}

const SelectBeatmapsetStatus: FC<SelectBeatmapsetStatusProps> = ({ initialStatus, disabled }) => {

    const [status, setStatus] = useState<BeatmapsetStatus>(initialStatus);

    const handleStatusSelect = (status: BeatmapsetStatus) => {
        setStatus(status);
    }

    return (<>
            <Select
                items={[...statuses]}
                renderItem={(item) => (
                    <div className="flex items-center gap-1">
                        <BeatmapsetStatusBadge status={item} truncate={true}/>
                    </div>
                )}
                onItemSelect={(item) => handleStatusSelect(item || "unverified")}
                selected={statuses.find((s) => s === status)}
                isSelected={(item) => item === status}
                className={"w-full sm:w-auto"}
                disabled={disabled}
            />
    </>
    );
};

export default SelectBeatmapsetStatus;
