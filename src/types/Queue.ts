export interface Queue {
    id: number;
    user_id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    is_open: boolean;
    display_data: {
        owner_profile: {
            username: string;
            avatar_url: string;
        },
        manager_profiles: {
            username: string;
            avatar_url: string;
        }[]
    }
}
