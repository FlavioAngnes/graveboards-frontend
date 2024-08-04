export interface BeatmapsetListing {
    id: number;
    beatmapset_snapshot: BeatmapsetSnapshot;
    display_data: BeatmapsetDisplayData;
}

export interface BeatmapsetSnapshot {
    id: number;
    beatmapset_id: number;
    snapshot_number: number;
    snapshot_date: string;
    checksum: string;
    verified: boolean;

    // osu! API datastructure
    artist: string;
    artist_unicode: string;
    covers: Covers;
    creator: string;
    favourite_count: number;
    hype: Hype;
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

interface BeatmapSnapshot {
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

export interface BeatmapsetDisplayData {
    title: string;
    artist: string;
    thumbnail: string;
    mapper: string;
    mapper_avatar: string;
    length: number;
    difficulties: number[];
    verified: boolean;
}

interface Covers {
    cover: string;
    "cover@2x": string;
    card: string;
    "card@2x": string;
    list: string;
    "list@2x": string;
    slimcover: string;
    "slimcover@2x": string;
}

interface Hype {
    current: number;
    required: number;
}