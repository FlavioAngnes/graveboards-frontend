import {UserProfile} from "@/types/userProfile";

interface UserRole {
    id: number;
    name: string;
}

export interface User {
    profile: UserProfile;
    roles: UserRole[];
    scores: string[];
    tokens: number[];
    queues: string[];
    requests: number[];
    beatmaps: number[];
    beatmapsets: number[];
    id: number;
    managed_queues: string[];
}
