import {Component, OnInit} from "@angular/core";
import {BeatmapQueueRequest, QueueRequest} from "../../models/QueueRequest";
import {catchError, combineLatestWith, Observable, of} from "rxjs";
import {BeatmapService} from "../../services/beatmap.service";
import {RequestService} from "../../services/request.service";
import {RefreshService} from "../../services/refresh.service";
import {map} from "rxjs/operators";
import {BeatmapsetListing} from "../../models/Beatmapset";
import {
    RequestBeatmapPanelHorizontalPlaceholderComponent
} from "../../components/loading-placeholders/request-beatmap-panel-horizontal-placeholder/request-beatmap-panel-horizontal-placeholder.component";
import {
    RequestBeatmapPanelHorizontalComponent
} from "../../components/beatmap-panels/request-beatmap-panel-horizontal/request-beatmap-panel-horizontal.component";
import {NgForOf, NgIf} from "@angular/common";
import {ScrollNearEndDirective} from "../../directives/scroll-near-end.directive";
import {
    InfiniteScrollBeatmapPanelListComponent
} from "../../components/infinite-scroll-beatmap-panel-list/infinite-scroll-beatmap-panel-list.component";

@Component({
    selector: 'manage-requests',
    standalone: true,
    imports: [
        RequestBeatmapPanelHorizontalPlaceholderComponent,
        RequestBeatmapPanelHorizontalComponent,
        NgIf,
        ScrollNearEndDirective,
        NgForOf
    ],
    templateUrl: './manage-requests.component.html',
    styleUrl: './manage-requests.component.scss'
})
export class ManageRequestsComponent extends InfiniteScrollBeatmapPanelListComponent implements OnInit {
    override panels_per_scroll: number = 16; // Number of panels to load per scroll
    override panel_height: number = 106; // panel height + gap in pixels

    visibleRequests: BeatmapQueueRequest[] = [];

    requests$: Observable<QueueRequest[]> | null = null;
    combined$: Observable<BeatmapQueueRequest[]> | null = null;

    constructor(
        beatmap: BeatmapService,
        protected request: RequestService,
        refreshService: RefreshService
    ) {
        super(beatmap, refreshService);
    }

    override ngOnInit(): void {
        this.refreshService.refresh$.subscribe(() => {
            this.refresh();
        });

        if (typeof window === 'undefined') return;

        addEventListener('resize', () => {
            this.computePanelsPerScroll();
            this.loadBeatmaps(this.visibleRequests.length);
        });

        this.computePanelsPerScroll();
        this.refresh();
    }

    override refresh() {
        this.isLoading = true;

        this.beatmaps$ = this.beatmap.getBeatmapsetListings().pipe(
            catchError(err => {
                console.error(err);
                return of([]); // Return an empty array on error
            })
        );

        this.requests$ = this.request.getRequests().pipe(
            catchError(err => {
                console.error(err);
                return of([]); // Return an empty array on error
            })
        );

        this.combined$ = this.requests$.pipe(
            combineLatestWith(this.beatmaps$),
            map(([requests, beatmaps]) => {
                    return requests.map((request: QueueRequest) => {
                        const beatmap = beatmaps.find((beatmap: BeatmapsetListing) => beatmap.beatmapset_snapshot.beatmapset_id === request.beatmapset_id);
                        return {beatmap, request} as BeatmapQueueRequest;
                    });
                }
            )
        );

        this.combined$.subscribe(
            requests => {
                this.visibleRequests = requests.slice(0, this.panels_per_scroll);
                this.totalBeatmaps = requests.length;
                this.isLoading = false;
            }
        )
    }

    override computePanelsPerScroll(): void {
        if (typeof window === 'undefined') return;

        this.panels_per_scroll = Math.ceil(window.innerHeight / this.panel_height);
    }

    override loadBeatmaps(offset: number = 0): void {
        if (this.isLoading || this.visibleRequests.length === this.totalBeatmaps) return;

        this.isLoading = true;

        this.combined$!.pipe(
            map(requests => {
                if (this.visibleRequests.length === requests.length) {
                    return [];
                }

                return requests.slice(this.visibleRequests.length, this.visibleRequests.length + this.panels_per_scroll - offset);
            })
        ).subscribe(
            newRequests => {
                this.visibleRequests = [...this.visibleRequests, ...newRequests];
                this.isLoading = false;
            },
            error => {
                console.error('Error loading beatmaps:', error);
                this.isLoading = false;  // Reset loading state even if there's an error
            }
        );
    }
}
