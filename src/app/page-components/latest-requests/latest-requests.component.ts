import {Component, OnInit} from "@angular/core";
import {
    BeatmapPanelPlaceholderComponent
} from "../../components/loading-placeholders/beatmap-panel-placeholder/beatmap-panel-placeholder.component";
import {
    BaseBeatmapPanelComponent
} from "../../components/beatmap-panels/base-beatmap-panel/base-beatmap-panel.component";
import {ScrollNearEndDirective} from "../../directives/scroll-near-end.directive";
import {NgForOf, NgIf} from "@angular/common";
import {
    InfiniteScrollBeatmapPanelListComponent
} from "../../components/infinite-scroll-beatmap-panel-list/infinite-scroll-beatmap-panel-list.component";

@Component({
    selector: 'app-latest-requests',
    standalone: true,
    imports: [
        BeatmapPanelPlaceholderComponent,
        BaseBeatmapPanelComponent,
        ScrollNearEndDirective,
        NgForOf,
        NgIf
    ],
    templateUrl: './latest-requests.component.html',
    styleUrl: './latest-requests.component.scss',
})
export class LatestRequestsComponent extends InfiniteScrollBeatmapPanelListComponent implements OnInit {
}