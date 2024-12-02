import React, {FC} from 'react';
import {MdOutlineGroupWork} from "react-icons/md";
import {BeatmapsetListGroup} from "@/components/beatmapsets/beatmapsetList";
import clsx from "clsx";

interface GroupingProps {
    grouping: BeatmapsetListGroup,
    setGrouping: (value: (((prevState: (BeatmapsetListGroup)) => (BeatmapsetListGroup)) | BeatmapsetListGroup)) => void
}

const Grouping: FC<GroupingProps> = ({grouping, setGrouping}) => {
    return (
        <button
            onClick={() => setGrouping(prev => {
                const groupOrder: BeatmapsetListGroup[] = ['artist', 'mapper', null];
                const nextGroupIndex = (groupOrder.indexOf(prev) + 1) % groupOrder.length;
                return groupOrder[nextGroupIndex];
            })}
            className={clsx(
                `p-1 gap-1.5 rounded-lg hover:bg-tertiary-100 active:bg-tertiary-200 hover:dark:bg-tertiary-900 active:dark:bg-tertiary-800 flex items-center border-2 justify-center transition-colors duration-300 ease-in-out`,
                grouping ? 'h-9 text-primary-500 border-primary-500' : 'size-9 text-tertiary-500 border-transparent'
            )}

        >
            <MdOutlineGroupWork className="size-5"/>
            {grouping && (<div className="pr-1">
                {grouping.charAt(0).toUpperCase() + grouping.slice(1)}
            </div>)}
        </button>
    );
};

export default Grouping;
