import {Profile} from "@/types/Profile";

export interface User {
    profile: Profile;
    roles: { id: number; name: string }[];
    scores: string[];
    tokens: number[];
    queues: string[];
    requests: number[];
    beatmaps: number[];
    beatmapsets: number[];
    id: number;
    managed_queues: string[];
}
