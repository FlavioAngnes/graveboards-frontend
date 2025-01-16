'use client'

import {FC} from "react";
import {BeatmapsetListing} from "@/types/beatmapsets/beatmapset";
import {MdChevronRight, MdPlayArrow, MdRadioButtonChecked} from "react-icons/md";
import {ColorUtils} from "@/utils/colorUtils";
import {TimeUtils} from "@/utils/timeUtils";
import Button from "@/components/shared/button";

interface BeatmapsetProps {
    beatmapset: BeatmapsetListing,
}

const BeatmapsetPanelListView: FC<BeatmapsetProps> = ({beatmapset}) => {
    return (
        <div className="flex rounded-xl overflow-hidden h-24">
            <div
                className="hidden sm:block h-full aspect-video bg-center bg-no-repeat bg-[size:215%]"
                style={{backgroundImage: `url(${beatmapset.beatmapset_snapshot.covers["cover@2x"]})`}}>
                <div className="flex gap-1.5 z-10">
                    <Button className="px-1.5 gap-1 h-8.5 font-semibold text-sm transition-[opacity, max-height] box-border duration-300 ease-in-out">
                        <MdPlayArrow className="size-4 shrink-0"/>
                        PREVIEW
                    </Button>
                    <div
                        className="bg-black bg-opacity-80 text-white rounded-lg p-1.5 leading-none text-sm overflow-hidden transition-[opacity, max-height] box-border duration-300 ease-in-out">
                        {TimeUtils.formatTime(beatmapset.beatmapset_snapshot.beatmap_snapshots[0].total_length)}
                    </div>
                </div>
                <div
                    className="absolute w-full h-full backdrop-blur backdrop-brightness-75 -mb-2.5 -mr-2.5 duration-300"></div>
            </div>
            <div
                className={`bg-tertiary-50 hover:bg-tertiary-100 hover:dark:bg-tertiary-800 dark:text-white dark:bg-tertiary-900 grid grid-cols-[repeat(2,_minmax(0,_1fr)),_3rem]
                    lg:grid-cols-[repeat(3,_minmax(0,_1fr)),_3rem] xl:grid-cols-[repeat(4,_minmax(0,_1fr)),_3rem] w-full items-center gap-8 p-8 sm:p-4 self-stretch transition-colors duration-300 ease-in-out overflow-hidden relative tracking-wide`}>
                <div className="truncate">
                    <a href={`https://osu.ppy.sh/beatmapsets/${beatmapset.beatmapset_snapshot.beatmapset_id}`}
                       className="text-sm font-semibold leading-5" target="_blank">
                        {beatmapset.beatmapset_snapshot.title}
                    </a>
                    <div className="text-xs text-tertiary-500 dark:text-tertiary-400 truncate">
                        by {beatmapset.beatmapset_snapshot.artist}
                    </div>
                    <div className="block lg:hidden text-xs text-tertiary-500 dark:text-tertiary-400 truncate">
                        Mapped by <a href={`https://osu.ppy.sh/users/${beatmapset.beatmapset_snapshot.user_id}`}
                                     className="font-semibold" target="_blank">{beatmapset.beatmapset_snapshot.creator}</a>
                    </div>
                </div>

                <div className="hidden lg:flex items-center gap-2 truncate">
                    <a href={`https://osu.ppy.sh/users/${beatmapset.beatmapset_snapshot.user_id}`}
                       className="size-10 shrink-0 bg-gray-500 rounded-full bg-cover" target="_blank"
                       style={{backgroundImage: `url(${beatmapset.display_data.mapper_avatar})`}}></a>
                    <div className="flex flex-col">
                        <div className="text-xs text-tertiary-500 dark:text-tertiary-400">
                            Mapped by
                        </div>
                        <a href={`https://osu.ppy.sh/users/${beatmapset.beatmapset_snapshot.user_id}`}
                           className="text-sm font-semibold" target="_blank">{beatmapset.beatmapset_snapshot.creator}</a>
                    </div>
                </div>

                <div
                    className="flex flex-col gap-0 transition-[gap] duration-300 delay-300 ease-out group hover:gap-2 hover:delay-0">
                    <div className="flex items-center gap-1 self-stretch">
                        <MdRadioButtonChecked className="size-4 shrink-0 text-tertiary-500 dark:text-tertiary-400"/>
                        <div className="flex items-center gap-0.5">
                            {
                                beatmapset.beatmapset_snapshot.beatmap_snapshots
                                    .sort((a, b) => a.difficulty_rating - b.difficulty_rating)
                                    .slice(0, 6)
                                    .map((beatmap, index) => (
                                        <div key={index} className="w-1.5 h-4 bg-gray-500 rounded-full"
                                             style={{backgroundColor: ColorUtils.forStarRating(beatmap.difficulty_rating)}}></div>
                                    ))
                            }

                            {beatmapset.beatmapset_snapshot.beatmap_snapshots.length > 6 && (
                                <div className="text-xs ml-1 text-tertiary-500 dark:text-tertiary-400">
                                    +{beatmapset.beatmapset_snapshot.beatmap_snapshots.length - 6}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="hidden xl:block">
                    {TimeUtils.formatTime(beatmapset.beatmapset_snapshot.beatmap_snapshots[0].total_length)}
                </div>

                <MdChevronRight className="size-6 shrink-0 text-tertiary-500 justify-self-end"/>
            </div>
        </div>
    );
}

export default BeatmapsetPanelListView;
