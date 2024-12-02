import {SortingLayerOrders} from "@/types/sorting";

export interface BeatmapsetListSortingLayerOptions {
    value: BeatmapsetListSortingLayerValue;
    order: SortingLayerOrders;
    isDefault?: true;
}

export type BeatmapsetListSortingLayerValue =
    | 'Profile.country_code'
    | 'Profile.graveyard_beatmapset_count'
    | 'Profile.loved_beatmapset_count'
    | 'Profile.pending_beatmapset_count'
    | 'Profile.ranked_beatmapset_count'
    | 'Profile.total_maps'
    | 'Profile.total_kudosu'
    | 'BeatmapSnapshot.beatmap_id'
    | 'BeatmapSnapshot.user_id'
    | 'BeatmapSnapshot.difficulty_rating'
    | 'BeatmapSnapshot.mode'
    | 'BeatmapSnapshot.total_length'
    | 'BeatmapSnapshot.version'
    | 'BeatmapSnapshot.accuracy'
    | 'BeatmapSnapshot.ar'
    | 'BeatmapSnapshot.bpm'
    | 'BeatmapSnapshot.count_circles'
    | 'BeatmapSnapshot.count_sliders'
    | 'BeatmapSnapshot.count_spinners'
    | 'BeatmapSnapshot.cs'
    | 'BeatmapSnapshot.drain'
    | 'BeatmapSnapshot.last_updated'
    | 'BeatmapSnapshot.passcount'
    | 'BeatmapSnapshot.playcount'
    | 'BeatmapsetSnapshot.beatmapset_id'
    | 'BeatmapsetSnapshot.user_id'
    | 'BeatmapsetSnapshot.artist'
    | 'BeatmapsetSnapshot.artist_unicode'
    | 'BeatmapsetSnapshot.creator'
    | 'BeatmapsetSnapshot.favourite_count'
    | 'BeatmapsetSnapshot.offset'
    | 'BeatmapsetSnapshot.play_count'
    | 'BeatmapsetSnapshot.source'
    | 'BeatmapsetSnapshot.status'
    | 'BeatmapsetSnapshot.title'
    | 'BeatmapsetSnapshot.title_unicode'
    | 'BeatmapsetSnapshot.track_id'
    | 'BeatmapsetSnapshot.num_difficulties'
    | 'BeatmapsetSnapshot.sr_gaps.min'
    | 'BeatmapsetSnapshot.sr_gaps.max'
    | 'BeatmapsetSnapshot.sr_gaps.avg'
    | 'Request.comment'
    | 'Request.mv_checked'
    | 'Request.created_at'
    | 'Request.updated_at'
    | 'Request.status';

/*export const BeatmapsetssSortingLayerValues: BeatmapsetsSortingLayerValues[] = [
    'Profile.country_code',
    'Profile.graveyard_beatmapset_count',
    'Profile.loved_beatmapset_count',
    'Profile.pending_beatmapset_count',
    'Profile.ranked_beatmapset_count',
    'Profile.total_maps',
    'Profile.total_kudosu',
    'BeatmapSnapshot.beatmap_id',
    'BeatmapSnapshot.user_id',
    'BeatmapSnapshot.difficulty_rating',
    'BeatmapSnapshot.mode',
    'BeatmapSnapshot.total_length',
    'BeatmapSnapshot.version',
    'BeatmapSnapshot.accuracy',
    'BeatmapSnapshot.ar',
    'BeatmapSnapshot.bpm',
    'BeatmapSnapshot.count_circles',
    'BeatmapSnapshot.count_sliders',
    'BeatmapSnapshot.count_spinners',
    'BeatmapSnapshot.cs',
    'BeatmapSnapshot.drain',
    'BeatmapSnapshot.last_updated',
    'BeatmapSnapshot.passcount',
    'BeatmapSnapshot.playcount',
    'BeatmapsetSnapshot.beatmapset_id',
    'BeatmapsetSnapshot.user_id',
    'BeatmapsetSnapshot.artist',
    'BeatmapsetSnapshot.artist_unicode',
    'BeatmapsetSnapshot.creator',
    'BeatmapsetSnapshot.favourite_count',
    'BeatmapsetSnapshot.offset',
    'BeatmapsetSnapshot.play_count',
    'BeatmapsetSnapshot.source',
    'BeatmapsetSnapshot.status',
    'BeatmapsetSnapshot.title',
    'BeatmapsetSnapshot.title_unicode',
    'BeatmapsetSnapshot.track_id',
    'BeatmapsetSnapshot.num_difficulties',
    'BeatmapsetSnapshot.sr_gaps.min',
    'BeatmapsetSnapshot.sr_gaps.max',
    'BeatmapsetSnapshot.sr_gaps.avg',
    'Request.comment',
    'Request.mv_checked',
    'Request.created_at',
    'Request.updated_at',
    'Request.status',
];*/

/*
export const BeatmapsetsSortingLayerOptions = {
    Profile: {
        country_code: 'Profile.country_code',
        graveyard_beatmapset_count: 'Profile.graveyard_beatmapset_count',
        loved_beatmapset_count: 'Profile.loved_beatmapset_count',
        pending_beatmapset_count: 'Profile.pending_beatmapset_count',
        ranked_beatmapset_count: 'Profile.ranked_beatmapset_count',
        total_maps: 'Profile.total_maps',
        total_kudosu: 'Profile.total_kudosu',
    },
    BeatmapSnapshot: {
        beatmap_id: 'BeatmapSnapshot.beatmap_id',
        user_id: 'BeatmapSnapshot.user_id',
        difficulty_rating: 'BeatmapSnapshot.difficulty_rating',
        mode: 'BeatmapSnapshot.mode',
        total_length: 'BeatmapSnapshot.total_length',
        version: 'BeatmapSnapshot.version',
        accuracy: 'BeatmapSnapshot.accuracy',
        ar: 'BeatmapSnapshot.ar',
        bpm: 'BeatmapSnapshot.bpm',
        count_circles: 'BeatmapSnapshot.count_circles',
        count_sliders: 'BeatmapSnapshot.count_sliders',
        count_spinners: 'BeatmapSnapshot.count_spinners',
        cs: 'BeatmapSnapshot.cs',
        drain: 'BeatmapSnapshot.drain',
        last_updated: 'BeatmapSnapshot.last_updated',
        passcount: 'BeatmapSnapshot.passcount',
        playcount: 'BeatmapSnapshot.playcount',
    },
    BeatmapsetSnapshot: {
        beatmapset_id: 'BeatmapsetSnapshot.beatmapset_id',
        user_id: 'BeatmapsetSnapshot.user_id',
        artist: 'BeatmapsetSnapshot.artist',
        artist_unicode: 'BeatmapsetSnapshot.artist_unicode',
        creator: 'BeatmapsetSnapshot.creator',
        favourite_count: 'BeatmapsetSnapshot.favourite_count',
        offset: 'BeatmapsetSnapshot.offset',
        play_count: 'BeatmapsetSnapshot.play_count',
        source: 'BeatmapsetSnapshot.source',
        status: 'BeatmapsetSnapshot.status',
        title: 'BeatmapsetSnapshot.title',
        title_unicode: 'BeatmapsetSnapshot.title_unicode',
        track_id: 'BeatmapsetSnapshot.track_id',
        num_difficulties: 'BeatmapsetSnapshot.num_difficulties',
        sr_gaps: {
            min: 'BeatmapsetSnapshot.sr_gaps.min',
            max: 'BeatmapsetSnapshot.sr_gaps.max',
            avg: 'BeatmapsetSnapshot.sr_gaps.avg',
        },
    },
    Request: {
        comment: 'Request.comment',
        mv_checked: 'Request.mv_checked',
        created_at: 'Request.created_at',
        updated_at: 'Request.updated_at',
        status: 'Request.status',
    },
} as const;

export type BeatmapsetSortingLayerOptions = typeof BeatmapsetSortingLayerOptions[keyof typeof BeatmapsetListingSortingOptions];
 */
