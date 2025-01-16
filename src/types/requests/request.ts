import {BeatmapsetListing} from "@/types/beatmapsets/beatmapset";
import {Profile} from "@/types/profile";
import {Queue} from "@/types/queue";

export enum RequestStatus {
    Pending = 'Pending',
    Accepted = 'Accepted',
    Rejected = 'Rejected',
}

export interface Request {
    id: number;
    user_id: number;
    user?: Partial<Profile>;
    beatmapset_id: number;
    beatmapset?: BeatmapsetListing;
    queue_id: number;
    queue?: Partial<Queue>;
    comment: string;
    mv_checked: boolean;
    created_at: Date;
    updated_at: Date;
    status: RequestStatus;
}
