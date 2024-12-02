import {ReactNode} from "react";
import {
    MdNumbers,
    MdOutlineEmojiFlags,
    MdOutlinePlayArrow,
    MdOutlineRadioButtonChecked,
    MdOutlineTextFormat
} from "react-icons/md";
import {BeatmapsetListFilterValue} from "@/types/beatmapsets/filters";

export const BeatmapsetListFiltersMap: Record<BeatmapsetListFilterValue, {
    icon: ReactNode,
    label: string,
}> = {
    "mapper_filter.kudosu.available": {
        icon: <MdNumbers/>,
        label: "Kudosu Count",
    },
    "mapper_filter.user_id": {
        icon: <MdNumbers/>,
        label: "User ID",
    },
    "mapper_filter.username": {
        icon: <MdOutlineTextFormat/>,
        label: "Username",
    },
    "mapper_filter.country_code": {
        icon: <MdOutlineEmojiFlags/>,
        label: "Country",
    },
    "mapper_filter.graveyard_beatmapset_count": {
        icon: <MdNumbers/>,
        label: "Graveyard Beatmapsets"
    },
    "mapper_filter.loved_beatmapset_count": {
        icon: <MdNumbers/>,
        label: "Loved Beatmapsets"
    },
    "mapper_filter.pending_beatmapset_count": {
        icon: <MdNumbers/>,
        label: "Pending Beatmapsets"
    },
    "mapper_filter.ranked_beatmapset_count": {
        icon: <MdNumbers/>,
        label: "Ranked Beatmapset Count"
    },
    "beatmapset_filter.beatmapset_id": {
        icon: <MdNumbers/>,
        label: "Beatmapset ID"
    },
    "beatmapset_filter.verified": {
        icon: <MdNumbers/>,
        label: "Verified"
    },
    "beatmapset_filter.artist": {
        icon: <MdOutlineTextFormat/>,
        label: "Artist"
    },
    "beatmapset_filter.title": {
        icon: <MdOutlineTextFormat/>,
        label: "Title"
    },
    "beatmapset_filter.creator": {
        icon: <MdOutlineTextFormat/>,
        label: "Creator"
    },
    "beatmapset_filter.source": {
        icon: <MdOutlineTextFormat/>,
        label: "Source"
    },
    "beatmapset_filter.mode": {
        icon: <MdOutlineRadioButtonChecked/>,
        label: "Mode"
    },
    "beatmapset_filter.status": {
        icon: <MdOutlineRadioButtonChecked/>,
        label: "Status"
    },
    "beatmapset_filter.favourite_count": {
        icon: <MdNumbers/>,
        label: "Favourite Count"
    },
    "beatmapset_filter.play_count": {
        icon: <MdOutlinePlayArrow/>,
        label: "Play Count"
    },
    "beatmap_filter.beatmap_id": {
        icon: <MdNumbers/>,
        label: "Beatmap ID"
    },
    "beatmap_filter.difficulty_rating": {
        icon: <MdNumbers/>,
        label: "Star Rating"
    },
    "beatmap_filter.mode": {
        icon: <MdOutlineRadioButtonChecked/>,
        label: "Mode"
    },
    "beatmap_filter.status": {
        icon: <MdOutlineRadioButtonChecked/>,
        label: "Status"
    },
    "beatmap_filter.total_length": {
        icon: <MdNumbers/>,
        label: "Total Length"
    },
    "beatmap_filter.version": {
        icon: <MdOutlineTextFormat/>,
        label: "Version"
    },
    "beatmap_filter.accuracy": {
        icon: <MdNumbers/>,
        label: "Accuracy"
    },
    "beatmap_filter.ar": {
        icon: <MdNumbers/>,
        label: "Approach Rate"
    },
    "beatmap_filter.count_circles": {
        icon: <MdNumbers/>,
        label: "Circle Count"
    },
    "beatmap_filter.count_sliders": {
        icon: <MdNumbers/>,
        label: "Slider Count"
    },
    "beatmap_filter.count_spinners": {
        icon: <MdNumbers/>,
        label: "Spinner Count"
    },
    "beatmap_filter.cs": {
        icon: <MdNumbers/>,
        label: "Circle Size"
    },
    "beatmap_filter.drain": {
        icon: <MdNumbers/>,
        label: "HP Drain"
    },
    "beatmap_filter.passcount": {
        icon: <MdNumbers/>,
        label: "Pass Count"
    },
    "beatmap_filter.playcount": {
        icon: <MdNumbers/>,
        label: "Play Count"
    },
    "request_filter.queue_id": {
        icon: <MdNumbers/>,
        label: "Queue ID"
    }
}
