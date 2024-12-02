import {ReactNode} from "react";
import {
    MdNumbers,
    MdOutlineEmojiFlags,
    MdOutlinePlayArrow,
    MdOutlineRadioButtonChecked,
    MdOutlineTextFormat,
} from "react-icons/md";

export interface FilterType<T> {
    eq?: T;
    gt?: T;
    lt?: T;
    gte?: T;
    lte?: T;
    neq?: T;
}

export interface FilterOptions<T> {
    value: FilterValue;
    options: FilterType<T>;
    isDefault?: true;
}

export type FilterOperators = 'eq' | 'gt' | 'lt' | 'gte' | 'lte' | 'neq';

export type FilterValue =
    "mapper_filter.kudosu.available" |
    "mapper_filter.user_id" |
    "mapper_filter.username" |
    "mapper_filter.country_code" |
    "mapper_filter.graveyard_beatmapset_count" |
    "mapper_filter.loved_beatmapset_count" |
    "mapper_filter.pending_beatmapset_count" |
    "mapper_filter.ranked_beatmapset_count" |
    "beatmapset_filter.beatmapset_id" |
    "beatmapset_filter.verified" |
    "beatmapset_filter.artist" |
    "beatmapset_filter.title" |
    "beatmapset_filter.creator" |
    "beatmapset_filter.source" |
    "beatmapset_filter.mode" |
    "beatmapset_filter.status" |
    "beatmapset_filter.favourite_count" |
    "beatmapset_filter.play_count" |
    "beatmap_filter.beatmap_id" |
    "beatmap_filter.difficulty_rating" |
    "beatmap_filter.mode" |
    "beatmap_filter.status" |
    "beatmap_filter.total_length" |
    "beatmap_filter.version" |
    "beatmap_filter.accuracy" |
    "beatmap_filter.ar" |
    "beatmap_filter.count_circles" |
    "beatmap_filter.count_sliders" |
    "beatmap_filter.count_spinners" |
    "beatmap_filter.cs" |
    "beatmap_filter.drain" |
    "beatmap_filter.passcount" |
    "beatmap_filter.playcount" |
    "request_filter.queue_id";

export const FiltersMap: Record<FilterValue, {
    icon: ReactNode,
    label: string,
}> = {
    "mapper_filter.kudosu.available": {
        icon: <MdNumbers/>,
        label: "Kudosu Count",
    },
    "mapper_filter.user_id": {
        icon: <MdNumbers/>,
        label: "User ID",
    },
    "mapper_filter.username": {
        icon: <MdOutlineTextFormat/>,
        label: "Username",
    },
    "mapper_filter.country_code": {
        icon: <MdOutlineEmojiFlags/>,
        label: "Country",
    },
    "mapper_filter.graveyard_beatmapset_count": {
        icon: <MdNumbers/>,
        label: "Graveyard Beatmapsets"
    },
    "mapper_filter.loved_beatmapset_count": {
        icon: <MdNumbers/>,
        label: "Loved Beatmapsets"
    },
    "mapper_filter.pending_beatmapset_count": {
        icon: <MdNumbers/>,
        label: "Pending Beatmapsets"
    },
    "mapper_filter.ranked_beatmapset_count": {
        icon: <MdNumbers/>,
        label: "Ranked Beatmapset Count"
    },
    "beatmapset_filter.beatmapset_id": {
        icon: <MdNumbers/>,
        label: "Beatmapset ID"
    },
    "beatmapset_filter.verified": {
        icon: <MdNumbers/>,
        label: "Verified"
    },
    "beatmapset_filter.artist": {
        icon: <MdOutlineTextFormat/>,
        label: "Artist"
    },
    "beatmapset_filter.title": {
        icon: <MdOutlineTextFormat/>,
        label: "Title"
    },
    "beatmapset_filter.creator": {
        icon: <MdOutlineTextFormat/>,
        label: "Creator"
    },
    "beatmapset_filter.source": {
        icon: <MdOutlineTextFormat/>,
        label: "Source"
    },
    "beatmapset_filter.mode": {
        icon: <MdOutlineRadioButtonChecked/>,
        label: "Mode"
    },
    "beatmapset_filter.status": {
        icon: <MdOutlineRadioButtonChecked/>,
        label: "Status"
    },
    "beatmapset_filter.favourite_count": {
        icon: <MdNumbers/>,
        label: "Favourite Count"
    },
    "beatmapset_filter.play_count": {
        icon: <MdOutlinePlayArrow/>,
        label: "Play Count"
    },
    "beatmap_filter.beatmap_id": {
        icon: <MdNumbers/>,
        label: "Beatmap ID"
    },
    "beatmap_filter.difficulty_rating": {
        icon: <MdNumbers/>,
        label: "Star Rating"
    },
    "beatmap_filter.mode": {
        icon: <MdOutlineRadioButtonChecked/>,
        label: "Mode"
    },
    "beatmap_filter.status": {
        icon: <MdOutlineRadioButtonChecked/>,
        label: "Status"
    },
    "beatmap_filter.total_length": {
        icon: <MdNumbers/>,
        label: "Total Length"
    },
    "beatmap_filter.version": {
        icon: <MdOutlineTextFormat/>,
        label: "Version"
    },
    "beatmap_filter.accuracy": {
        icon: <MdNumbers/>,
        label: "Accuracy"
    },
    "beatmap_filter.ar": {
        icon: <MdNumbers/>,
        label: "Approach Rate"
    },
    "beatmap_filter.count_circles": {
        icon: <MdNumbers/>,
        label: "Circle Count"
    },
    "beatmap_filter.count_sliders": {
        icon: <MdNumbers/>,
        label: "Slider Count"
    },
    "beatmap_filter.count_spinners": {
        icon: <MdNumbers/>,
        label: "Spinner Count"
    },
    "beatmap_filter.cs": {
        icon: <MdNumbers/>,
        label: "Circle Size"
    },
    "beatmap_filter.drain": {
        icon: <MdNumbers/>,
        label: "HP Drain"
    },
    "beatmap_filter.passcount": {
        icon: <MdNumbers/>,
        label: "Pass Count"
    },
    "beatmap_filter.playcount": {
        icon: <MdNumbers/>,
        label: "Play Count"
    },
    "request_filter.queue_id": {
        icon: <MdNumbers/>,
        label: "Queue ID"
    }
}

/*export interface BeatmapsetsFilters {
    mapper_filter?: MapperFilters;
    beatmap_filter?: BeatmapFilters;
    beatmapset_filter?: BeatmapsetFilters;
    request_filter?: RequestFilters;
}

export interface BeatmapsetFilters {
    id?: FilterOptions<number>;
    beatmapset_id?: FilterOptions<number>;
    snapshot_number?: FilterOptions<number>;
    snapshot_date?: FilterOptions<string>;
    checksum?: FilterOptions<string>;
    verified?: FilterOptions<boolean>;

    // osu! API datastructure
    artist?: FilterOptions<string>;
    artist_unicode?: FilterOptions<string>;
    covers?: {
        cover?: FilterOptions<string>;
        "cover@2x"?: FilterOptions<string>;
        card?: FilterOptions<string>;
        "card@2x"?: FilterOptions<string>;
        list?: FilterOptions<string>;
        "list@2x"?: FilterOptions<string>;
        slimcover?: FilterOptions<string>;
        "slimcover@2x"?: FilterOptions<string>;
    };
    creator?: FilterOptions<string>;
    favourite_count?: FilterOptions<number>;
    hype?: {
        current?: FilterOptions<number>;
        required?: FilterOptions<number>;
    };
    nsfw?: FilterOptions<boolean>;
    offset?: FilterOptions<number>;
    play_count?: FilterOptions<number>;
    preview_url?: FilterOptions<string>;
    source?: FilterOptions<string>;
    spotlight?: FilterOptions<boolean>;
    status?: FilterOptions<string>;
    title?: FilterOptions<string>;
    title_unicode?: FilterOptions<string>;
    track_id?: FilterOptions<number>;
    user_id?: FilterOptions<number>;
    video?: FilterOptions<boolean>;

    // Relationships
    beatmap_snapshots?: FilterOptions<BeatmapSnapshot[]>;
}

export interface BeatmapFilters {
    id?: FilterOptions<number>;
    beatmap_id?: FilterOptions<number>;
    snapshot_number?: FilterOptions<number>;
    snapshot_date?: FilterOptions<string>;
    checksum?: FilterOptions<string>;
    difficulty_rating?: FilterOptions<number>;
    mode?: FilterOptions<"osu" | "taiko" | "fruits" | "mania">;
    status?: FilterOptions<"ranked" | "loved" | "qualified" | "pending" | "wip" | "graveyard">;
    total_length?: FilterOptions<number>;
    user_id?: FilterOptions<number>;
    version?: FilterOptions<string>;
    accuracy?: FilterOptions<number>;
    ar?: FilterOptions<number>;
    convert?: FilterOptions<boolean>;
    count_circles?: FilterOptions<number>;
    count_sliders?: FilterOptions<number>;
    count_spinners?: FilterOptions<number>;
    cs?: FilterOptions<number>;
    deleted_at?: FilterOptions<string>;
    drain?: FilterOptions<number>;
    hit_length?: FilterOptions<number>;
    is_scoreable?: FilterOptions<boolean>;
    last_updated?: FilterOptions<string>;
    mode_int?: FilterOptions<number>;
    passcount?: FilterOptions<number>;
    playcount?: FilterOptions<number>;
    ranked?: FilterOptions<number>;
    url?: FilterOptions<string>;
}

export interface MapperFilters {
    kudosu: {
        available: FilterOptions<number>;
        total: FilterOptions<number>;
    };
    id?: FilterOptions<number>;
    user_id?: FilterOptions<number>;
    updated_at?: FilterOptions<string>;
    avatar_url?: FilterOptions<string>;
    username?: FilterOptions<string>;
    country_code?: FilterOptions<string>;
    graveyard_beatmapset_count?: FilterOptions<number>;
    loved_beatmapset_count?: FilterOptions<number>;
    pending_beatmapset_count?: FilterOptions<number>;
    ranked_beatmapset_count?: FilterOptions<number>;
    is_restricted?: FilterOptions<boolean>;
}

export interface RequestFilters {
    beatmapset_id?: FilterOptions<number>;
    comment?: FilterOptions<string>;
    mv_checked?: FilterOptions<boolean>;
    user_id?: FilterOptions<number>;
    queue_id?: FilterOptions<number>;
}*/
