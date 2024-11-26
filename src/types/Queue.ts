import {User} from "@/app/types/User";

export interface Queue {
    user_id: number;
    requests: number[];
    managers: number[];
    id: number;
    name: string;
    description: string;
    updated_at: string;
}

export interface QueueWithUsers extends Queue {
    user: User;
    managers_users: User[];
}
