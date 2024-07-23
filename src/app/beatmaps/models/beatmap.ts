export interface BeatmapsetListing {
    beatmapset_snapshot: BeatmapsetSnapshot;
    display_data: BeatmapsetDisplayData;
    id: number;
}

export interface BeatmapsetSnapshot {
    artist: string;
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