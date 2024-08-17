import {Component, OnInit} from '@angular/core';
import {AsyncPipe, CommonModule, NgOptimizedImage} from '@angular/common';
import {BaseBeatmapPanelComponent} from "../beatmap-panels/base-beatmap-panel/base-beatmap-panel.component";
import {
    BeatmapPanelPlaceholderComponent
} from "../loading-placeholders/beatmap-panel-placeholder/beatmap-panel-placeholder.component";
import {ScrollNearEndDirective} from "../../../directives/scroll-near-end.directive";
import {MatIcon} from "@angular/material/icon";
import {
    InfiniteScrollBeatmapPanelListDirective
} from "../../../directives/infinite-scroll-beatmap-panel-list/infinite-scroll-beatmap-panel-list.directive";

@Component({
    selector: 'app-latest-requests',
    standalone: true,
    imports: [CommonModule, AsyncPipe, NgOptimizedImage, BaseBeatmapPanelComponent, BeatmapPanelPlaceholderComponent, ScrollNearEndDirective, MatIcon],
    templateUrl: './latest-requests.component.html',
    styleUrl: './latest-requests.component.scss',
})
export class LatestRequestsComponent extends InfiniteScrollBeatmapPanelListDirective implements OnInit {
}