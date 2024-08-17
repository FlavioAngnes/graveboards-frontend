import {Component, OnInit} from '@angular/core';
import {BeatmapsetListing} from '../../models/Beatmapset';
import {catchError, combineLatestWith, Observable, of} from 'rxjs';
import {RequestFilter} from '../../models/interfaces';
import {AsyncPipe, CommonModule, NgOptimizedImage} from '@angular/common';
import {BaseBeatmapPanelComponent} from "../../beatmaps/components/beatmap-panels/base-beatmap-panel/base-beatmap-panel.component";
import {BeatmapQueueRequest, QueueRequest} from "../../models/QueueRequest";
import {RefreshService} from "../../services/refresh.service";
import {RequestService} from "../../services/request.service";
import {BeatmapService} from "../../services/beatmap.service";
import {RequestBeatmapPanelComponent} from "../../beatmaps/components/beatmap-panels/request-beatmap-panel/request-beatmap-panel.component";
import {map} from "rxjs/operators";
import {
    BeatmapPanelPlaceholderComponent
} from "../../beatmaps/components/beatmap-panel-placeholder/beatmap-panel-placeholder.component";
import {
    RequestBeatmapPanelHorizontalComponent
} from "../../beatmaps/components/beatmap-panels/request-beatmap-panel-horizontal/request-beatmap-panel-horizontal.component";
import {
    RequestBeatmapPanelHorizontalPlaceholderComponent
} from "../../beatmaps/components/request-beatmap-panel-horizontal-placeholder/request-beatmap-panel-horizontal-placeholder.component";
import {ScrollNearEndDirective} from "../../directives/scroll-near-end.directive";
import {
    InfiniteScrollBeatmapPanelListDirective
} from "../../directives/infinite-scroll-beatmap-panel-list/infinite-scroll-beatmap-panel-list.directive";


@Component({
    selector: 'my-requests',
    standalone: true,
    imports: [CommonModule, AsyncPipe, NgOptimizedImage, BaseBeatmapPanelComponent, RequestBeatmapPanelComponent, BeatmapPanelPlaceholderComponent, RequestBeatmapPanelHorizontalComponent, RequestBeatmapPanelHorizontalPlaceholderComponent, ScrollNearEndDirective],
    templateUrl: './my-requests.component.html',
    styleUrl: './my-requests.component.scss',
})
export class MyRequestsComponent extends InfiniteScrollBeatmapPanelListDirective implements OnInit {
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
