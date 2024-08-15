import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgOptimizedImage, NgStyle, SlicePipe} from "@angular/common";
import {MatIconModule} from '@angular/material/icon';
import {Router} from "@angular/router";
import {BeatmapsetListing} from "../../../../models/Beatmapset";
import {ColorUtils} from "../../../../utils/ColorUtils";
import {TimeUtils} from "../../../../utils/TimeUtils";

export interface BaseBeatmapPanelData {
    id: number,
    beatmapset_id: number,
    title: string,
    artist: string,
    thumbnail: string,
    mapper: string,
    mapper_avatar: string,
    length: number,
    difficulties: number[],
    difficulties_details: BaseBeatmapPanelDifficultyData[],
}

export interface BaseBeatmapPanelDifficultyData {
    difficulty_rating: number,
    version: string,
}

export function toBaseBeatmapPanelData({id, beatmapset_snapshot, display_data}: BeatmapsetListing): BaseBeatmapPanelData {
    const snapshots = beatmapset_snapshot.beatmap_snapshots;

    const difficulties_details = snapshots
        .map(snapshot => ({
            difficulty_rating: snapshot.difficulty_rating,
            version: snapshot.version
        }))
        .sort((a, b) => b.difficulty_rating - a.difficulty_rating);

    return {
        id: id,
        beatmapset_id: beatmapset_snapshot.beatmapset_id,
        ...display_data,
        difficulties_details: difficulties_details,
    } as BaseBeatmapPanelData;
}

@Component({
    selector: 'base-beatmap-panel',
    standalone: true,
    imports: [
        NgForOf,
        NgIf,
        NgOptimizedImage,
        SlicePipe,
        NgStyle,
        MatIconModule,
        NgClass
    ],
    templateUrl: './base-beatmap-panel.component.html',
    styleUrl: './base-beatmap-panel.component.scss'
})

export class BaseBeatmapPanelComponent implements OnInit {
    @Input({
            transform:
                (value: BeatmapsetListing): BaseBeatmapPanelData => toBaseBeatmapPanelData(value)
        }) beatmap!: BaseBeatmapPanelData;

    isHovered: boolean = false;

    protected color: ColorUtils;
    protected time: TimeUtils;

    constructor(protected router: Router) {
        this.color = new ColorUtils();
        this.time = new TimeUtils();
    }

    ngOnInit(): void {
    }

    onMouseEnter() {
        this.isHovered = true;
    }

    onMouseLeave() {
        this.isHovered = false;
    }
}