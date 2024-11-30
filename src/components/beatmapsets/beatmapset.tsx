'use client'

import {FC, useState} from "react";
import clsx from "clsx";
import {BeatmapsetListing} from "@/types/beatmapsets/Beatmapset";
import {MdChevronRight, MdRadioButtonChecked} from "react-icons/md";

interface BeatmapsetProps {
    beatmapset: BeatmapsetListing,
    view?: "list" | "grid"
}

const Beatmapset: FC<BeatmapsetProps> = ({beatmapset, view}) => {
    const [hover, setHover] = useState(false);

    return (view && view === "grid" ? (
            <div className="flex flex-col items-start shrink-0 rounded-xl overflow-hidden self-stretch min-w-72 h-64">
                <div
                    className={clsx("relative flex flex-col items-end p-2.5 justify-end gap-3 grow shrink-0 basis-0 self-stretch transition-[filter] duration-300 ease-in-out bg-center bg-no-repeat bg-[size:215%] tracking-[0.25px]", {"delay-300": hover})}
                    style={{backgroundImage: `url(${beatmapset.beatmapset_snapshot.covers["cover@2x"]})`}}>
                    <div
                        className={clsx("absolute w-full h-full backdrop-blur backdrop-brightness-75 -mb-2.5 -mr-2.5 duration-300", {"opacity-0": !hover})}></div>
                    <div
                        className={clsx("bg-black bg-opacity-80 text-white rounded-lg p-1.5 leading-none text-sm overflow-hidden transition-[opacity, max-height] box-border duration-300 ease-in-out",
                            {"opacity-0": hover},
                            hover ? "max-h-0" : "max-h-7")}>
                        {formatTime(beatmapset.display_data.length)}
                    </div>
                </div>
                <div
                    className="bg-tertiary-50 hover:bg-tertiary-100 hover:dark:bg-tertiary-800 dark:text-white dark:bg-tertiary-900 flex gap-3 p-2.5 self-stretch min-w-24 transition-colors duration-300 ease-in-out overflow-hidden relative tracking-wide">
                    <a href={`https://osu.ppy.sh/users/${beatmapset.beatmapset_snapshot.user_id}`}
                       className="size-10 bg-gray-500 rounded-full bg-cover" target="_blank"
                       style={{backgroundImage: `url(${beatmapset.display_data.mapper_avatar})`}}></a>
                    <div className="overflow-hidden flex-1 truncate">
                        <a href={`https://osu.ppy.sh/beatmapsets/${beatmapset.beatmapset_snapshot.beatmapset_id}`}
                           className="text-sm font-semibold leading-5" target="_blank">
                            {beatmapset.display_data.title}
                        </a>
                        <div className="text-xs text-tertiary-500 dark:text-tertiary-400 truncate">
                            by {beatmapset.display_data.artist}
                        </div>
                        <div className="text-xs text-tertiary-500 dark:text-tertiary-400">
                            Mapped by <a href={`https://osu.ppy.sh/users/${beatmapset.beatmapset_snapshot.user_id}`}
                                         className="font-semibold" target="_blank">{beatmapset.display_data.mapper}</a>
                        </div>
                        <div onMouseEnter={() => setHover(true)}
                             onMouseLeave={() => setHover(false)}
                             className="flex flex-col mt-2 gap-0 transition-[gap] duration-300 delay-300 ease-out group hover:gap-2 hover:delay-0">
                            <div className="flex items-center gap-1 self-stretch">
                                <MdRadioButtonChecked className="size-4 shrink-0 text-tertiary-500 dark:text-tertiary-400"/>
                                <div className="flex items-center gap-0.5">
                                    {
                                        beatmapset.beatmapset_snapshot.beatmap_snapshots
                                            .sort((a, b) => a.difficulty_rating - b.difficulty_rating)
                                            .slice(0, 14)
                                            .map((beatmap, index) => (
                                                <div key={index} className="w-1.5 h-4 bg-gray-500 rounded-full"
                                                     style={{backgroundColor: ColorUtils.forStarRating(beatmap.difficulty_rating)}}></div>
                                            ))
                                    }

                                    {beatmapset.beatmapset_snapshot.beatmap_snapshots.length > 14 && (
                                        <div className="text-xs ml-1 text-tertiary-500 dark:text-tertiary-400">
                                            +{beatmapset.beatmapset_snapshot.beatmap_snapshots.length - 14}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div
                                className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-hover:grid-rows-[1fr] grid-hover:delay-300">
                                <div className="overflow-hidden grid-rows-[1fr]">
                                    <div className="flex flex-col gap-1 text-xs overflow-y-scroll snap-y">
                                        {
                                            beatmapset.beatmapset_snapshot.beatmap_snapshots
                                                .sort((a, b) => b.difficulty_rating - a.difficulty_rating)
                                                .slice(0, 5)
                                                .map((beatmap, index) => (

                                                    <div key={index}
                                                         className="snap-start flex items-center gap-1 flex-1 shrink-0 overflow-x-hidden">
                                                        <MdRadioButtonChecked className="size-4 shrink-0 text-tertiary-500 dark:text-tertiary-400"/>
                                                        <div className="px-2 rounded-full font-semibold"
                                                             style={{
                                                                 backgroundColor: ColorUtils.forStarRating(beatmap.difficulty_rating),
                                                                 color: beatmap.difficulty_rating >= 6.5 ? "#fff" : "#000"
                                                             }}>
                                                            ★ {beatmap.difficulty_rating.toFixed(2)}
                                                        </div>
                                                        <div
                                                            className="truncate">
                                                            {beatmap.version}
                                                        </div>
                                                    </div>
                                                ))
                                        }

                                        {beatmapset.beatmapset_snapshot.beatmap_snapshots.length > 5 && (
                                            <div
                                                className="snap-start flex items-center gap-1 flex-1 shrink-0 overflow-x-hidden">
                                                <div
                                                    className="size-4 bg-tertiary-500 dark:bg-tertiary-400 rounded-full shrink-0"></div>
                                                <div className="text-xs ml-1 text-tertiary-500 dark:text-tertiary-400">
                                                    +{beatmapset.beatmapset_snapshot.beatmap_snapshots.length - 5} more...
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="flex rounded-xl overflow-hidden h-24">
                <div
                    className="hidden sm:block h-full aspect-video bg-center bg-no-repeat bg-[size:215%]"
                    style={{backgroundImage: `url(${beatmapset.beatmapset_snapshot.covers["cover@2x"]})`}}>
                </div>
                <div
                    className={`bg-tertiary-50 hover:bg-tertiary-100 hover:dark:bg-tertiary-800 dark:text-white dark:bg-tertiary-900 grid grid-cols-[repeat(2,_minmax(0,_1fr)),_3rem]
                    lg:grid-cols-[repeat(3,_minmax(0,_1fr)),_3rem] xl:grid-cols-[repeat(4,_minmax(0,_1fr)),_3rem] w-full items-center gap-8 p-8 sm:p-4 self-stretch transition-colors duration-300 ease-in-out overflow-hidden relative tracking-wide`}>
                    <div className="truncate">
                        <a href={`https://osu.ppy.sh/beatmapsets/${beatmapset.beatmapset_snapshot.beatmapset_id}`}
                           className="text-sm font-semibold leading-5" target="_blank">
                            {beatmapset.display_data.title}
                        </a>
                        <div className="text-xs text-tertiary-500 dark:text-tertiary-400 truncate">
                            by {beatmapset.display_data.artist}
                        </div>
                        <div className="block lg:hidden text-xs text-tertiary-500 dark:text-tertiary-400 truncate">
                            Mapped by <a href={`https://osu.ppy.sh/users/${beatmapset.beatmapset_snapshot.user_id}`}
                                         className="font-semibold" target="_blank">{beatmapset.display_data.mapper}</a>
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
                               className="text-sm font-semibold" target="_blank">{beatmapset.display_data.mapper}</a>
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
                        {formatTime(beatmapset.display_data.length)}
                    </div>

                    <MdChevronRight className="size-6 shrink-0 text-tertiary-500 justify-self-end"/>
                </div>
            </div>
        )
    );
}

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

type ColorStop = [number, string];

export class ColorUtils {
    static toColor4FromHex(hex: string): Color4 {
        const bigint = parseInt(hex.replace("#", ""), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return new Color4(r / 255, g / 255, b / 255);
    }

    static toHexFromColor4(color: Color4): string {
        const to255 = (c: number) => Math.round(c * 255);
        return `#${((1 << 24) + (to255(color.r) << 16) + (to255(color.g) << 8) + to255(color.b)).toString(16).slice(1)}`;
    }

    static toHexFromRgb(r: number, g: number, b: number): string {
        const to255 = (c: number) => Math.round(c * 255);
        return `#${((1 << 24) + (to255(r) << 16) + (to255(g) << 8) + to255(b)).toString(16).slice(1)}`;
    }

    static forStarRating(starDifficulty: number): string {
        const stops: ColorStop[] = [
            [0.0, "#aaaaaa"],
            [0.1, "#aaaaaa"],
            [0.1, "#4290fb"],
            [1.25, "#4fc0ff"],
            [2.0, "#4fffd5"],
            [2.5, "#7cff4f"],
            [3.3, "#f6f05c"],
            [4.2, "#ff8068"],
            [4.9, "#ff4e6f"],
            [5.8, "#c645b8"],
            [6.7, "#6563de"],
            [7.7, "#18158e"],
            [9.0, "#000000"],
        ];

        const roundedDifficulty = Math.round(starDifficulty * 100) / 100;

        for (let i = 1; i < stops.length; i++) {
            const [stop1Pos, stop1Color] = stops[i - 1];
            const [stop2Pos, stop2Color] = stops[i];

            if (roundedDifficulty <= stop2Pos) {
                const t = (roundedDifficulty - stop1Pos) / (stop2Pos - stop1Pos);
                const color1 = this.toColor4FromHex(stop1Color);
                const color2 = this.toColor4FromHex(stop2Color);

                const r = color1.r + (color2.r - color1.r) * t;
                const g = color1.g + (color2.g - color1.g) * t;
                const b = color1.b + (color2.b - color1.b) * t;
                const a = color1.a + (color2.a - color1.a) * t;

                return this.toHexFromColor4(new Color4(r, g, b, a));
            }
        }

        return stops[stops.length - 1][1];
    }
}

class Color4 {
    constructor(public r: number, public g: number, public b: number, public a: number = 1.0) {
    }
}

export default Beatmapset;
