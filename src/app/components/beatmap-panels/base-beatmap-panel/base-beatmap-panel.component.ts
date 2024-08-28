import {Component, Input, OnDestroy} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgOptimizedImage, NgStyle, SlicePipe} from "@angular/common";
import {MatIconModule} from '@angular/material/icon';
import {Router} from "@angular/router";
import {BeatmapsetListing} from "../../../models/Beatmapset";
import {TimeUtils} from "../../../utils/TimeUtils";
import {DifficultyListComponent} from "../difficulty-list/difficulty-list.component";
import {
    DetailedDifficultyListComponent,
    DifficultyDetails
} from "../detailed-difficulty-list/detailed-difficulty-list.component";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {AudioService} from "../../../services/audio.service";

export interface BaseBeatmapPanelData {
    id: number,
    beatmapset_id: number,
    preview_url: string,
    title: string,
    artist: string,
    thumbnail: string,
    mapper: string,
    mapper_avatar: string,
    length: number,
    difficulties: number[],
    difficulties_details: DifficultyDetails[],
}

export function toBaseBeatmapPanelData({id, beatmapset_snapshot,display_data}: BeatmapsetListing): BaseBeatmapPanelData {
    const snapshots = beatmapset_snapshot.beatmap_snapshots;

    const difficulties_details = snapshots
        .map(snapshot => ({
            difficulty_rating: snapshot.difficulty_rating,
            version: snapshot.version
        }))
        .sort((a, b) => b.difficulty_rating - a.difficulty_rating);

    const {mapper_avatar, ...rest} = display_data;

    return {
        id: id,
        beatmapset_id: beatmapset_snapshot.beatmapset_id,
        preview_url: beatmapset_snapshot.preview_url,
        mapper_avatar: mapper_avatar ?? "https://osu.ppy.sh/images/layout/avatar-guest@2x.png",
        ...rest,
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
        NgClass,
        DifficultyListComponent,
        DetailedDifficultyListComponent,
        MatProgressBarModule
    ],
    templateUrl: './base-beatmap-panel.component.html',
    styleUrl: './base-beatmap-panel.component.scss'
})

export class BaseBeatmapPanelComponent implements OnDestroy {
    @Input({
        transform:
            (value: BeatmapsetListing): BaseBeatmapPanelData => toBaseBeatmapPanelData(value)
    }) beatmap!: BaseBeatmapPanelData;

    isHovered: boolean = false;

    protected audioIcon: string = "play_arrow";
    protected audioProgress: number = 0;

    protected songSrcSubscription: any;
    protected playStatusSubscription: any;
    protected currentTimeSubscription: any;

    protected time: TimeUtils;

    constructor(protected router: Router, protected audio: AudioService) {
        this.time = new TimeUtils();
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    onMouseEnter() {
        this.isHovered = true;
    }

    onMouseLeave() {
        this.isHovered = false;
    }

    toggleAudio() {
        if (this.audioIcon === "stop") {
            // Stop the audio
            this.audio.stopAudio();

            // Unsubscribe from further observation if user stops the audio
            this.unsubscribe();

            // Set the defaults
            this.applyDefaults();

            return; // We don't want to continue the function if the audio is stopped by the user
        }

        // Play the audio and update the icon
        this.audio.playAudio(this.beatmap.preview_url);
        this.audioIcon = "stop";


        this.songSrcSubscription = this.audio.songSrc$.subscribe((src) => {
            if (src !== this.beatmap.preview_url) {
                // Unsubscribe from further observation if audio source changed
                this.unsubscribe();

                // Set the defaults
                this.applyDefaults();
            }
        });

        this.playStatusSubscription = this.audio.playStatus$.subscribe((status) => {
            if (!status) {
                // Unsubscribe from further observation if the audio is stopped
                this.unsubscribe();

                // Set the defaults
                this.applyDefaults();
            }
        });

        this.currentTimeSubscription = this.audio.currentTime$.subscribe((time) => {
            this.audioProgress = time / 10 * 100; // We know the preview length is 10 seconds
            if (time >= 10) {
                // Unsubscribe from further observation if the audio stops
                this.unsubscribe();

                // Set the defaults
                this.applyDefaults();
            }
        });
    }

    unsubscribe() {
        this.songSrcSubscription?.unsubscribe();
        this.playStatusSubscription?.unsubscribe();
        this.currentTimeSubscription?.unsubscribe();
    }

    applyDefaults() {
        this.audioIcon = "play_arrow";
        this.audioProgress = 0;
    }
}
