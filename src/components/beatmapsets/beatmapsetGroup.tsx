import React, {FC, ReactNode, useState} from 'react';
import {Beatmapset} from "@/types/beatmapsets/beatmapset";
import BeatmapsetPanel from "@/components/beatmapsets/panels/beatmapsetPanel";
import {MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp} from "react-icons/md";
import clsx from "clsx";

interface BeatmapsetGroupProps {
    icon?: ReactNode;
    title: string;
    beatmapsets: Beatmapset[];
    view: 'list' | 'grid';
}

const BeatmapsetGroup: FC<BeatmapsetGroupProps> = ({icon, title, beatmapsets, view}) => {
    const [open, setOpen] = useState(true);

    return (
        <div className="flex flex-col gap-4">
            <button
                onClick={() => setOpen(prev => !prev)}
                className="flex items-center rounded-lg justify-between p-2.5 hover:dark:bg-tertiary-900 active:dark:bg-tertiary-800 transition-colors duration-300 ease-in-out">
                <div className="flex items-center gap-2">
                    {icon && (
                        <div className="size-5">
                            {icon}
                        </div>
                    )}
                    <div className="text-2xl font-bold truncate transition-all duration-300 ease-in-out">
                        {title}
                    </div>
                </div>
                    {open ? (
                        <MdOutlineKeyboardArrowUp className="size-5"/>
                    ) : (
                        <MdOutlineKeyboardArrowDown className="size-5"/>
                    )}
            </button>

            {open && (
                <div
                    className={clsx(
                        'gap-4',
                        view === 'grid' ? `grid grid-cols-[repeat(auto-fill,_minmax(18rem,_1fr))]` : `flex flex-col`
                    )}
                >
                    {beatmapsets.map(beatmapset => (
                        <BeatmapsetPanel beatmapset={beatmapset} view={view} key={beatmapset.id}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BeatmapsetGroup;
