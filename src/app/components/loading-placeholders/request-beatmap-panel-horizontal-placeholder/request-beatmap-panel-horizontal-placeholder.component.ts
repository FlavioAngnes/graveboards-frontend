import { Component } from '@angular/core';
import {DifficultyListComponent} from "../../beatmap-panels/difficulty-list/difficulty-list.component";
import {MatIcon} from "@angular/material/icon";
import {MatProgressBar} from "@angular/material/progress-bar";
import {NgIf} from "@angular/common";
import {
    QueueStatusButtonComponent
} from "../../beatmap-panels/request-beatmap-panel-horizontal/queue-status-button/queue-status-button.component";
import {
    VerificationButtonComponent
} from "../../beatmap-panels/request-beatmap-panel-horizontal/verification-button/verification-button.component";

@Component({
  selector: 'request-beatmap-panel-horizontal-placeholder',
  standalone: true,
    imports: [
        DifficultyListComponent,
        MatIcon,
        MatProgressBar,
        NgIf,
        QueueStatusButtonComponent,
        VerificationButtonComponent
    ],
  templateUrl: './request-beatmap-panel-horizontal-placeholder.component.html',
  styleUrl: './request-beatmap-panel-horizontal-placeholder.component.scss'
})
export class RequestBeatmapPanelHorizontalPlaceholderComponent {

}
