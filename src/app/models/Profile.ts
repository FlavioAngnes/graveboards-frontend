export interface Profile {
    kudosu: {
        total: number,
        available: number
    };
    id: number;
    user_id: number;
    updated_at: string;
    avatar_url: string;
    username: string;
    country_code: string;
    graveyard_beatmapset_count: number;
    loved_beatmapset_count: number;
    pending_beatmapset_count: number;
    ranked_beatmapset_count: number;
    is_restricted: boolean;
}