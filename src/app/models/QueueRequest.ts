import {BeatmapsetListing} from "./Beatmapset";
import {Profile} from "./Profile";

export interface QueueRequest {
    id: number;
    user_id: number;
    profile: Profile;
    beatmapset_id: number;
    queue_id?: number | null;  // Optional field since it can be nullable
    comment?: string | null;   // Optional field since it can be nullable
    mv_checked: boolean;
    created_at: string;  // Using string for DateTime (ISO 8601 format expected)
    updated_at: string;  // Using string for DateTime (ISO 8601 format expected)
    status: number;
}

export interface BeatmapQueueRequest {
    request: QueueRequest;
    beatmap: BeatmapsetListing;
}