import { UserProfile } from "@/types/userProfile";
import { BeatmapsetSnapshot } from "@/types/beatmapsets/beatmapset";
import { Queue } from "@/types/queue";

export const RequestStatuses = {
    Pending: 0,
    Rejected: -1,
    Accepted: 1,
} as const;

export type RequestStatus = typeof RequestStatuses[keyof typeof RequestStatuses];

export interface BeatmapsetRequest {
    id: number;
    user_id: number;
    user_profile: Partial<UserProfile>;
    beatmapset_id: number;
    beatmapset_snapshot: BeatmapsetSnapshot;
    queue_id: number;
    queue: Partial<Queue>;
    comment: string;
    mv_checked: boolean;
    created_at: Date;
    updated_at: Date;
    status: RequestStatus;
}
