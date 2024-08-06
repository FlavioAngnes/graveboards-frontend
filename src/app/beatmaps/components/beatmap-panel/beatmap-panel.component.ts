import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgOptimizedImage, NgStyle, SlicePipe} from "@angular/common";
import {MatIconModule} from '@angular/material/icon';
import {Router} from "@angular/router";
import {QueueRequestWithBeatmap} from "../../models/queueRequest";

type BeatmapPanelData = {
    id: number,
    beatmapset_id: number,
    title: string,
    artist: string,
    thumbnail: string,
    mapper: string,
    mapper_avatar: string,
    length: string,
    star_ratings: number[],
    difficulties: BeatmapPanelDifficultyData[],
    queue_status: number,
}

type BeatmapPanelDifficultyData = {
    difficulty_rating: number,
    version: string,
}

function beatmapListingToPanelData({beatmap, id, status}: QueueRequestWithBeatmap): BeatmapPanelData {
    if (beatmap === undefined) {
        throw new Error('beatmapListingToPanelData requires a beatmap object');
    }

    return {
        id: id,
        beatmapset_id: beatmap.beatmapset_snapshot.beatmapset_id,
        title: beatmap.display_data.title,
        artist: beatmap.beatmapset_snapshot.artist,
        thumbnail: beatmap.display_data.thumbnail,
        mapper: beatmap.display_data.mapper,
        mapper_avatar: beatmap.display_data.mapper_avatar,
        length: formatTime(beatmap.display_data.length),
        star_ratings: beatmap.beatmapset_snapshot.beatmap_snapshots.map(snapshot => snapshot.difficulty_rating).sort((a, b) => a - b),
        difficulties: beatmap.beatmapset_snapshot.beatmap_snapshots.map(snapshot => {
            return {
                difficulty_rating: snapshot.difficulty_rating,
                version: snapshot.version
            }
        }).sort((a, b) => a.difficulty_rating - b.difficulty_rating).reverse(),
        queue_status: status
    }
}

@Component({
    selector: 'beatmap-panel',
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
    templateUrl: './beatmap-panel.component.html',
    styleUrl: './beatmap-panel.component.scss'
})

export class BeatmapPanelComponent implements OnInit {
    @Input({
        transform:
            (value: QueueRequestWithBeatmap): BeatmapPanelData => beatmapListingToPanelData(value)
    }) beatmap!: BeatmapPanelData;
    isHovered: boolean = false;
    statusIcon: string = '/assets/icons/modqueue/default-stamp.svg';

    constructor(private router: Router) {
        if (this.beatmap === undefined) {
            throw new Error('BeatmapPanelComponent requires a beatmap input');
        }
    }

    ngOnInit() {
        switch (this.beatmap.queue_status) {
            case -1:
                this.statusIcon = '/assets/icons/modqueue/rejected-stamp.svg';
                break;
            case 0:
                this.statusIcon = '/assets/icons/modqueue/default-stamp.svg';
                break;
            case 1:
                this.statusIcon = '/assets/icons/modqueue/accepted-stamp.svg';
                break;
        }
    }

    onMouseEnter() {
        this.isHovered = true;
    }

    onMouseLeave() {
        this.isHovered = false;
    }

    getBackgroundImageUrl(): string {
        const placeholder = 'assets/default-bg.png';
        return `url(${this.beatmap.thumbnail}), url(${placeholder})`;
    }

    getCurrentPath(): string {
        return this.router.url;
    }

    getColorForStarDifficulty(starDifficulty: number): string {
        const stops: ColorStop[] = [
            [0.0, "#aaaaaa"],
            [0.1, "#aaaaaa"],
            [0.1, "#4290fb"],
            [1.25, "#4fc0ff"],
            [2.0, "#4fffd5"],
            [2.5, "#7cff4f"],
            [3.3, "#f6f05c"],
            [4.2, "#ff8068"],
            [4.9, "#ff4e6f"],
            [5.8, "#c645b8"],
            [6.7, "#6563de"],
            [7.7, "#18158e"],
            [9.0, "#000000"],
        ];

        const roundedDifficulty = Math.round(starDifficulty * 100) / 100;

        for (let i = 1; i < stops.length; i++) {
            const [stop1Pos, stop1Color] = stops[i - 1];
            const [stop2Pos, stop2Color] = stops[i];

            if (roundedDifficulty <= stop2Pos) {
                const t = (roundedDifficulty - stop1Pos) / (stop2Pos - stop1Pos);
                const color1 = Color4.fromHex(stop1Color);
                const color2 = Color4.fromHex(stop2Color);

                const r = color1.r + (color2.r - color1.r) * t;
                const g = color1.g + (color2.g - color1.g) * t;
                const b = color1.b + (color2.b - color1.b) * t;
                const a = color1.a + (color2.a - color1.a) * t;

                return Color4.toHexFromColor4(new Color4(r, g, b, a));
            }
        }

        return stops[stops.length - 1][1];
    }
}

// TODO: Move to some Utils class
type ColorStop = [number, string]; // Tuple type for the gradient stops

class Color4 {
    constructor(public r: number, public g: number, public b: number, public a: number = 1.0) {
    }

    static fromHex(hex: string): Color4 {
        const bigint = parseInt(hex.replace("#", ""), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return new Color4(r / 255, g / 255, b / 255);
    }

    static toHexFromColor4(color: Color4): string {
        const to255 = (c: number) => Math.round(c * 255);
        return `#${((1 << 24) + (to255(color.r) << 16) + (to255(color.g) << 8) + to255(color.b)).toString(16).slice(1)}`;
    }

    static toHexFromRgb(r: number, g: number, b: number): string {
        const to255 = (c: number) => Math.round(c * 255);
        return `#${((1 << 24) + (to255(r) << 16) + (to255(g) << 8) + to255(b)).toString(16).slice(1)}`;
    }
}

function formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;

    // Format seconds to always be two digits
    const formattedSeconds: string = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds.toString();

    return `${minutes}:${formattedSeconds}`;
}