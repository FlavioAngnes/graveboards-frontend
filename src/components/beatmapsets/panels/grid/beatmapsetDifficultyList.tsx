import { Beatmapset } from "@/types/beatmapsets/beatmapset";
import { FC } from "react";
import { MdRadioButtonChecked } from "react-icons/md";
import { ColorUtils } from "@/utils/colorUtils";

interface BeatmapsetDifficultyListProps {
    beatmapset: Beatmapset;
}

export const BeatmapsetDifficultyList: FC<BeatmapsetDifficultyListProps> = ({beatmapset}) => {
    return (
        <div className="flex flex-col gap-1 text-xs overflow-y-scroll snap-y max-h-24">
            {
                beatmapset.beatmapset_snapshot.beatmap_snapshots
                    .sort((a, b) => b.difficulty_rating - a.difficulty_rating)
                    .map((beatmap, index) => (

                        <div key={index}
                             className="snap-start flex items-center gap-1 flex-1 shrink-0 overflow-x-hidden">
                            <MdRadioButtonChecked
                                className="size-4 shrink-0 text-tertiary-500 dark:text-tertiary-400" />
                            <div className="px-2 rounded-full font-semibold"
                                 style={{
                                     backgroundColor: ColorUtils.forStarRating(beatmap.difficulty_rating),
                                     color: beatmap.difficulty_rating >= 6.5 ? "#fff" : "#000"
                                 }}>
                                ★ {beatmap.difficulty_rating.toFixed(2)}
                            </div>
                            <a href={`https://osu.ppy.sh/beatmapsets/${beatmapset.beatmapset_snapshot.beatmapset_id}#${beatmap.mode}/${beatmap.beatmap_id}`}
                                className="truncate hover:underline">
                                {beatmap.version}
                            </a>
                        </div>
                    ))
            }
        </div>
    )
};
