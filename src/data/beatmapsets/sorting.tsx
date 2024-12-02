import React from "react";
import {
    MdCheckCircleOutline, MdFavoriteBorder, MdMusicNote, MdOutlineCalendarToday,
    MdOutlineEditCalendar,
    MdOutlineEmojiFlags, MdOutlineFunctions, MdOutlineMoreTime,
    MdOutlineNumbers, MdOutlinePlayArrow,
    MdOutlineStarBorder, MdOutlineTextFormat, MdOutlineTimer,
    MdPersonOutline, MdPlayArrow,
    MdRadioButtonChecked
} from "react-icons/md";
import {BeatmapsetListSortingLayerValue} from "@/types/beatmapsets/sorting";

export const BeatmapsetListSortingLayerMap: Record<BeatmapsetListSortingLayerValue, {
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
