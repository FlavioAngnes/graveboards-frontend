import {FilterType} from "@/types/filters";

export interface BeatmapsetListFilterOptions<T> {
    value: BeatmapsetListFilterValue;
    options: FilterType<T>;
    isDefault?: true;
}

export type BeatmapsetListFilterValue = MapperFilterValue | BeatmapsetFilterValue | BeatmapFilterValue | RequestFilterValue;

export type MapperFilterValue = "mapper_filter.kudosu.available" |
    "mapper_filter.user_id" |
    "mapper_filter.username" |
    "mapper_filter.country_code" |
    "mapper_filter.graveyard_beatmapset_count" |
    "mapper_filter.loved_beatmapset_count" |
    "mapper_filter.pending_beatmapset_count" |
    "mapper_filter.ranked_beatmapset_count";

export type BeatmapsetFilterValue = "beatmapset_filter.beatmapset_id" |
    "beatmapset_filter.verified" |
    "beatmapset_filter.artist" |
    "beatmapset_filter.title" |
    "beatmapset_filter.creator" |
    "beatmapset_filter.source" |
    "beatmapset_filter.mode" |
    "beatmapset_filter.status" |
    "beatmapset_filter.favourite_count" |
    "beatmapset_filter.play_count";

export type BeatmapFilterValue = "beatmap_filter.beatmap_id" |
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
    "beatmap_filter.playcount";

export type RequestFilterValue = "request_filter.queue_id" |
    "request_filter.beatmapset_id";

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
