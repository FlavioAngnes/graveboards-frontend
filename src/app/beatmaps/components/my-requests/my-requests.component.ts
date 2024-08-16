import {Component, OnInit} from '@angular/core';
import {BeatmapsetListing} from '../../../models/Beatmapset';
import {catchError, combineLatestWith, Observable, of} from 'rxjs';
import {RequestFilter} from '../../../interfaces';
import {AsyncPipe, CommonModule, NgOptimizedImage} from '@angular/common';
import {BaseBeatmapPanelComponent} from "../beatmap-panels/base-beatmap-panel/base-beatmap-panel.component";
import {BeatmapQueueRequest, QueueRequest} from "../../../models/QueueRequest";
import {RefreshService} from "../../../services/refresh.service";
import {RequestService} from "../../../services/request.service";
import {BeatmapService} from "../../../services/beatmap.service";
import {RequestBeatmapPanelComponent} from "../beatmap-panels/request-beatmap-panel/request-beatmap-panel.component";
import {map} from "rxjs/operators";
import {
    BeatmapPanelPlaceholderComponent
} from "../loading-placeholders/beatmap-panel-placeholder/beatmap-panel-placeholder.component";


@Component({
    selector: 'my-requests',
    standalone: true,
    imports: [CommonModule, AsyncPipe, NgOptimizedImage, BaseBeatmapPanelComponent, RequestBeatmapPanelComponent, BeatmapPanelPlaceholderComponent],
    templateUrl: './my-requests.component.html',
    styleUrl: './my-requests.component.scss',
})
export class MyRequestsComponent implements OnInit {
    beatmaps$: Observable<BeatmapsetListing[]> | null = null;
    requests$: Observable<QueueRequest[]> | null = null;
    combined$: Observable<BeatmapQueueRequest[]> | null = null;
    isLoading = true;

    constructor(
        private beatmap: BeatmapService,
        private request: RequestService,
        private refreshService: RefreshService
    ) {
    }

    ngOnInit(): void {
        this.refreshService.refresh$.subscribe(() => {
            this.refresh();
        });

        this.refresh();
    }

    refresh() {
        this.isLoading = true;
        const requestFilter = this.getRequestFilter();

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
