import { UserProfile } from "@/types/userProfile";
import { FilterOptions } from "@/types/beatmapsets/filters";
import { Sorting } from "@/types/beatmapsets/sorting";

export interface Pagination {
    limit?: number;
    offset?: number;
}

export interface ListingOptions extends Pagination {
    filters?: FilterOptions<unknown>[];
    sortingLayers?: Sorting[];
    searchQuery?: string;
    queueId?: number;
}

export interface Beatmapset {
    id: number;
    beatmapset_snapshot: BeatmapsetSnapshot;
    updated_at: string;
}

export interface BeatmapsetSnapshot {
    id: number;
    beatmapset_id: number;
    snapshot_number: number;
    snapshot_date: string;
    checksum: string;
    verified: boolean;
    user_profile: Partial<UserProfile>;

    // osu! API datastructure
    artist: string;
    artist_unicode: string;
    covers: {
        cover: string;
        "cover@2x": string;
        card: string;
        "card@2x": string;
        list: string;
        "list@2x": string;
        slimcover: string;
        "slimcover@2x": string;
    };
    creator: string;
    favourite_count: number;
    hype: {
        current: number;
        required: number;
    };
    nsfw: boolean;
    offset: number;
    play_count: number;
    preview_url: string;
    source: string;
    spotlight: boolean;
    status: string;
    title: string;
    title_unicode: string;
    track_id: number;
    user_id: number;
    video: boolean;

    // Relationships
    beatmap_snapshots: BeatmapSnapshot[];
}

export interface BeatmapSnapshot {
    id: number;
    beatmap_id: number;
    snapshot_number: number;
    snapshot_date: string;
    checksum: string;

    // osu! API datastructure
    difficulty_rating: number;
    mode: string;
    status: string;
    total_length: number;
    user_id: number;
    version: string;
    accuracy: number;
    ar: number;
    bpm: number;
    convert: boolean;
    count_circles: number;
    count_sliders: number;
    count_spinners: number;
    cs: number;
    deleted_at: string;
    drain: number;
    hit_length: number;
    is_scoreable: boolean;
    last_updated: string;
    mode_int: number;
    passcount: number;
    playcount: number;
    ranked: number;
    url: string;
}
