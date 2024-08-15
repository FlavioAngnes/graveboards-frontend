import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgOptimizedImage, NgStyle, SlicePipe} from "@angular/common";
import {
    BaseBeatmapPanelComponent,
    BaseBeatmapPanelData,
    toBaseBeatmapPanelData
} from "../base-beatmap-panel/base-beatmap-panel.component";
import {Router} from "@angular/router";
import {BeatmapQueueRequest, QueueRequest} from "../../../../models/QueueRequest";

export interface RequestBeatmapPanelData extends BaseBeatmapPanelData {
    request_data: QueueRequest,
}

export function toRequestBeatmapPanelData({beatmap, request}: BeatmapQueueRequest): RequestBeatmapPanelData {
    return {
        request_data: request,
        ...toBaseBeatmapPanelData(beatmap)
    }
}

@Component({
    selector: 'request-beatmap-panel',
    standalone: true,
    imports: [
        NgForOf,
        NgIf,
        NgOptimizedImage,
        SlicePipe,
        NgClass,
        NgStyle
    ],
    templateUrl: './request-beatmap-panel.component.html',
    styleUrl: './request-beatmap-panel.component.scss'
})
export class RequestBeatmapPanelComponent extends BaseBeatmapPanelComponent implements OnInit {
    @Input({
        transform:
            (value: BeatmapQueueRequest): RequestBeatmapPanelData => toRequestBeatmapPanelData(value)
    }) override beatmap!: RequestBeatmapPanelData;
    
    protected icon: string = '/assets/icons/modqueue/default-stamp.svg';

    constructor(router: Router) {
        super(router);
    }

    override ngOnInit() {
        super.ngOnInit();

        switch (this.beatmap.request_data.status) {
            case -1:
                this.icon = '/assets/icons/modqueue/rejected-stamp.svg';
                break;
            case 0:
                this.icon = '/assets/icons/modqueue/default-stamp.svg';
                break;
            case 1:
                this.icon = '/assets/icons/modqueue/accepted-stamp.svg';
                break;
        }
    }
}
