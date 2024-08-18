import {Component, OnInit} from "@angular/core";
import {BeatmapQueueRequest, QueueRequest} from "../../models/QueueRequest";
import {catchError, combineLatestWith, Observable, of} from "rxjs";
import {BeatmapService} from "../../services/beatmap.service";
import {RequestService} from "../../services/request.service";
import {RefreshService} from "../../services/refresh.service";
import {map} from "rxjs/operators";
import {BeatmapsetListing} from "../../models/Beatmapset";
import {RequestFilter} from "../../models/interfaces";
import {
    BeatmapPanelPlaceholderComponent
} from "../../components/loading-placeholders/beatmap-panel-placeholder/beatmap-panel-placeholder.component";
import {
    RequestBeatmapPanelComponent
} from "../../components/beatmap-panels/request-beatmap-panel/request-beatmap-panel.component";
import {ScrollNearEndDirective} from "../../directives/scroll-near-end.directive";
import {NgForOf, NgIf} from "@angular/common";
import {
    InfiniteScrollBeatmapPanelListComponent
} from "../../components/infinite-scroll-beatmap-panel-list/infinite-scroll-beatmap-panel-list.component";

@Component({
    selector: 'my-requests',
    standalone: true,
    imports: [
        BeatmapPanelPlaceholderComponent,
        RequestBeatmapPanelComponent,
        ScrollNearEndDirective,
        NgIf,
        NgForOf
    ],
    templateUrl: './my-requests.component.html',
    styleUrl: './my-requests.component.scss',
})
export class MyRequestsComponent extends InfiniteScrollBeatmapPanelListComponent implements OnInit {
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

        this.isLoading = true;
    }

    override refresh() {
        const requestFilter = this.getRequestFilter();
        this.isLoading = true;

        this.beatmaps$ = this.beatmap.getBeatmapsetListings(requestFilter).pipe(
            catchError(err => {
                console.error(err);
                return of([]); // Return an empty array on error
            })
        );

        this.requests$ = this.request.getRequests(requestFilter).pipe(
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
                this.computePanelsPerScroll();
                this.visibleRequests = requests.slice(0, this.panels_per_scroll);
                this.totalBeatmaps = requests.length;
                this.isLoading = false;
            }
        )
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

    getRequestFilter(): RequestFilter {
        if (typeof window !== 'undefined' && window.sessionStorage) {
            const userInfo = sessionStorage.getItem('user')
            const user = userInfo ? JSON.parse(userInfo) : null;
            const userId = user.id;

            return {
                user_id: {eq: userId}
            };
        } else {
            return {};
        }
    }
}
