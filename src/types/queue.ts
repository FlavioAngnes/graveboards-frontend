import { UserProfile } from "@/types/userProfile";

export interface Queue {
    id: number;
    user_id: number;
    user_profile: Partial<UserProfile>;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    is_open: boolean;
    manager_profiles: Partial<UserProfile>[];
}
