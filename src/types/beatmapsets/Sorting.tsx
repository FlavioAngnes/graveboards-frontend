import React from "react";
import {
    MdCheckCircleOutline,
    MdFavorite, MdFavoriteBorder, MdMusicNote,
    MdOutlineCalendarToday,
    MdOutlineEditCalendar,
    MdOutlineEmojiFlags,
    MdOutlineFunctions, MdOutlineMoreTime,
    MdOutlineNumbers, MdOutlinePlayArrow,
    MdOutlineStarBorder,
    MdOutlineTextFormat,
    MdOutlineTimer,
    MdPersonOutline, MdPlayArrow, MdRadioButtonChecked
} from "react-icons/md";

export interface SortingLayerOptions {
    value: SortingLayerValue;
    order: SortingLayerOrders;
    isDefault?: true;
}

export type SortingLayerValue =
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

export type SortingLayerOrders = 'asc' | 'desc';

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

export const SortingLayerMap: Record<SortingLayerValue, {
    icon: React.ReactNode,
    label: string
}> = {
    'Profile.country_code': {
        icon: <MdOutlineEmojiFlags/>,
        label: 'Country'
    },
    'Profile.graveyard_beatmapset_count': {
        icon: <MdOutlineNumbers/>,
        label: 'Graveyard Beatmapsets'
    },
    'Profile.loved_beatmapset_count': {
        icon: <MdOutlineNumbers/>,
        label: 'Loved Beatmapsets'
    },
    'Profile.pending_beatmapset_count': {
        icon: <MdOutlineNumbers/>,
        label: 'Pending Beatmapsets'
    },
    'Profile.ranked_beatmapset_count': {
        icon: <MdOutlineNumbers/>,
        label: 'Ranked Beatmapsets'
    },
    'Profile.total_maps': {
        icon: <MdOutlineNumbers/>,
        label: 'Total Maps'
    },
    'Profile.total_kudosu': {
        icon: <MdOutlineNumbers/>,
        label: 'Total Kudosu'
    },
    'BeatmapSnapshot.beatmap_id': {
        icon: <MdOutlineNumbers/>,
        label: 'ID'
    },
    'BeatmapSnapshot.user_id': {
        icon: <MdPersonOutline/>,
        label: 'Creator ID'
    },
    'BeatmapSnapshot.difficulty_rating': {
        icon: <MdOutlineStarBorder/>,
        label: 'Star Rating'
    },
    'BeatmapSnapshot.mode': {
        icon: <MdRadioButtonChecked/>,
        label: 'Mode'
    },
    'BeatmapSnapshot.total_length': {
        icon: <MdOutlineTimer/>,
        label: 'Total Length'
    },
    'BeatmapSnapshot.version': {
        icon: <MdOutlineTextFormat/>,
        label: 'Difficulty Name'
    },
    'BeatmapSnapshot.bpm': {
        icon: <MdOutlineNumbers/>,
        label: 'BPM'
    },
    'BeatmapSnapshot.ar': {
        icon: <MdOutlineNumbers/>,
        label: 'Approach Rate'
    },
    'BeatmapSnapshot.cs': {
        icon: <MdOutlineNumbers/>,
        label: 'Circle Size'
    },
    'BeatmapSnapshot.accuracy': {
        icon: <MdOutlineNumbers/>,
        label: 'Overall Difficulty'
    },
    'BeatmapSnapshot.drain': {
        icon: <MdOutlineNumbers/>,
        label: 'HP Drain'
    },
    'BeatmapSnapshot.count_circles': {
        icon: <MdOutlineNumbers/>,
        label: 'Circle Count'
    },
    'BeatmapSnapshot.count_sliders': {
        icon: <MdOutlineNumbers/>,
        label: 'Slider Count'
    },
    'BeatmapSnapshot.count_spinners': {
        icon: <MdOutlineNumbers/>,
        label: 'Spinner Count'
    },
    'BeatmapSnapshot.last_updated': {
        icon: <MdOutlineEditCalendar/>,
        label: 'Last Updated'
    },
    'BeatmapSnapshot.passcount': {
        icon: <MdCheckCircleOutline/>,
        label: 'Pass Count'
    },
    'BeatmapSnapshot.playcount': {
        icon: <MdPlayArrow/>,
        label: 'Play Count'
    },
    'BeatmapsetSnapshot.beatmapset_id': {
        icon: <MdOutlineNumbers/>,
        label: 'ID'
    },
    'BeatmapsetSnapshot.creator': {
        icon: <MdPersonOutline/>,
        label: 'Creator'
    },
    'BeatmapsetSnapshot.user_id': {
        icon: <MdPersonOutline/>,
        label: 'Creator ID'
    },
    'BeatmapsetSnapshot.artist': {
        icon: <MdOutlineTextFormat/>,
        label: 'Artist'
    },
    'BeatmapsetSnapshot.artist_unicode': {
        icon: <MdOutlineTextFormat/>,
        label: 'Artist Unicode'
    },
    'BeatmapsetSnapshot.title': {
        icon: <MdOutlineTextFormat/>,
        label: 'Title'
    },
    'BeatmapsetSnapshot.title_unicode': {
        icon: <MdOutlineTextFormat/>,
        label: 'Title Unicode'
    },
    'BeatmapsetSnapshot.source': {
        icon: <MdOutlineTextFormat/>,
        label: 'Source'
    },
    'BeatmapsetSnapshot.favourite_count': {
        icon: <MdFavoriteBorder/>,
        label: 'Favourite Count'
    },
    'BeatmapsetSnapshot.play_count': {
        icon: <MdOutlinePlayArrow/>,
        label: 'Play Count'
    },
    'BeatmapsetSnapshot.num_difficulties': {
        icon: <MdOutlineNumbers/>,
        label: 'Difficulty Count'
    },
    'BeatmapsetSnapshot.status': {
        icon: <MdOutlineNumbers/>,
        label: 'Status'
    },
    'BeatmapsetSnapshot.track_id': {
        icon: <MdMusicNote/>,
        label: 'Track ID'
    },
    'BeatmapsetSnapshot.offset': {
        icon: <MdOutlineMoreTime/>,
        label: 'Offset'
    },
    'BeatmapsetSnapshot.sr_gaps.min': {
        icon: <MdOutlineFunctions/>,
        label: 'Min Star Rating Gap'
    },
    'BeatmapsetSnapshot.sr_gaps.max': {
        icon: <MdOutlineFunctions/>,
        label: 'Max Star Rating Gap'
    },
    'BeatmapsetSnapshot.sr_gaps.avg': {
        icon: <MdOutlineFunctions/>,
        label: 'Average Star Rating Gap'
    },
    'Request.comment': {
        icon: <MdOutlineTextFormat/>,
        label: 'Request Comment'
    },
    'Request.mv_checked': {
        icon: <MdCheckCircleOutline/>,
        label: 'Request MV Checked'
    },
    'Request.created_at': {
        icon: <MdOutlineCalendarToday/>,
        label: 'Request Creation Date'
    },
    'Request.updated_at': {
        icon: <MdOutlineEditCalendar/>,
        label: 'Request Update Date'
    },
    'Request.status': {
        icon: <MdOutlineNumbers/>,
        label: 'Request Status'
    },
};

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
