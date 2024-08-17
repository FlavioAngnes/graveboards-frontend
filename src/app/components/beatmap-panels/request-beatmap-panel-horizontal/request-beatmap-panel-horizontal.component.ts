import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgOptimizedImage, NgStyle, SlicePipe} from "@angular/common";
import {VerificationButtonComponent} from "./verification-button/verification-button.component";
import {QueueStatusButtonComponent} from "./queue-status-button/queue-status-button.component";
import {ClickOutsideDirective} from "../../../directives/click-outside.directive";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIcon} from "@angular/material/icon";
import {
    RequestBeatmapPanelComponent,
    RequestBeatmapPanelData, toRequestBeatmapPanelData
} from "../request-beatmap-panel/request-beatmap-panel.component";
import {Router} from "@angular/router";
import {BeatmapQueueRequest} from "../../../models/QueueRequest";
import {DifficultyListComponent} from "../difficulty-list/difficulty-list.component";
import {AudioService} from "../../../services/audio.service";
import {MatProgressBar} from "@angular/material/progress-bar";

export interface RequesterData {
    id: number;
    username: string;
    avatar_url: string;
    profile_url: string;
}

@Component({
    selector: 'request-beatmap-panel-horizontal',
    standalone: true,
    imports: [
        NgForOf,
        NgIf,
        NgOptimizedImage,
        SlicePipe,
        NgClass,
        NgStyle,
        VerificationButtonComponent,
        QueueStatusButtonComponent,
        ClickOutsideDirective,
        MatTooltipModule,
        MatIcon,
        DifficultyListComponent,
        MatProgressBar
    ],
    templateUrl: './request-beatmap-panel-horizontal.component.html',
    styleUrl: './request-beatmap-panel-horizontal.component.scss'
})
export class RequestBeatmapPanelHorizontalComponent extends RequestBeatmapPanelComponent implements OnInit {
    @Input({
        transform:
            (value: BeatmapQueueRequest): RequestBeatmapPanelData => toRequestBeatmapPanelData(value)
    }) override beatmap!: RequestBeatmapPanelData;

    protected requester!: RequesterData;

    constructor(router: Router, audio: AudioService) {
        super(router, audio);
    }

    override ngOnInit() {
        super.ngOnInit();

        this.requester = {
            id: this.beatmap.request_data.user_id,
            username: this.beatmap.request_data.profile.username,
            avatar_url: this.beatmap.request_data.profile.avatar_url,
            profile_url: `https://osu.ppy.sh/users/${this.beatmap.request_data.profile.user_id}`
        }
    }
}
