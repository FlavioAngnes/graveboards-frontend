import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgOptimizedImage, NgStyle, SlicePipe} from "@angular/common";
import {VerificationButtonComponent} from "./verification-button/verification-button.component";
import {QueueStatusButtonComponent} from "./queue-status-button/queue-status-button.component";
import {ClickOutsideDirective} from "../../../../directives/click-outside.directive";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIcon} from "@angular/material/icon";
import {
    RequestBeatmapPanelComponent,
    RequestBeatmapPanelData, toRequestBeatmapPanelData
} from "../request-beatmap-panel/request-beatmap-panel.component";
import {Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {BeatmapQueueRequest} from "../../../../models/QueueRequest";
import {DifficultyListComponent} from "../difficulty-list/difficulty-list.component";

export interface RequesterData {
    id: number;
    username: string;
    avatar_url: string;
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
        DifficultyListComponent
    ],
    templateUrl: './request-beatmap-panel-horizontal.component.html',
    styleUrl: './request-beatmap-panel-horizontal.component.scss'
})
export class RequestBeatmapPanelHorizontalComponent extends RequestBeatmapPanelComponent implements OnInit {
    @Input({
        transform:
            (value: BeatmapQueueRequest): RequestBeatmapPanelData => toRequestBeatmapPanelData(value)
    }) override beatmap!: RequestBeatmapPanelData;

    protected requester: RequesterData;

    constructor(router: Router, private auth: AuthService) {
        super(router);

        this.requester = {
            id: 0,
            username: "",
            avatar_url: ""
        }
    }

    override ngOnInit() {
        super.ngOnInit();

        this.auth.getUserOsuProfile(this.beatmap.request_data.user_id).subscribe(user => {
            // TODO: Populate requester data when sending request so we don't have to fetch it here
            this.requester.id = user.user_id;
            this.requester.username = user.username;
            this.requester.avatar_url = user.avatar_url;
        });
    }
}
