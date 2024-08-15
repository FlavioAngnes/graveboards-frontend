import {Component, OnInit} from '@angular/core';
import {BeatmapsetListing} from '../../../models/beatmap';
import {catchError, combineLatest, Observable, of} from 'rxjs';
import {RequestFilter} from '../../../interfaces';
import {AsyncPipe, CommonModule, NgOptimizedImage} from '@angular/common';
import {BeatmapPanelComponent} from "../beatmap-panel/beatmap-panel.component";
import {QueueRequest, QueueRequestWithBeatmap} from "../../../models/queueRequest";
import {map} from "rxjs/operators";
import {RefreshService} from "../../../services/refresh.service";
import {RequestService} from "../../../services/request.service";
import {BeatmapService} from "../../../services/beatmap.service";


@Component({
    selector: 'my-requests',
    standalone: true,
    imports: [CommonModule, AsyncPipe, NgOptimizedImage, BeatmapPanelComponent],
    templateUrl: './my-requests.component.html',
    styleUrl: './my-requests.component.scss',
})
export class MyRequestsComponent implements OnInit {
    beatmaps$: Observable<BeatmapsetListing[]> | null = null;
    requests$: Observable<QueueRequest[]> | null = null;
    combined$: Observable<QueueRequestWithBeatmap[]> | null = null;
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

        this.combined$ = combineLatest([this.beatmaps$, this.requests$]).pipe(
            map(([beatmaps, requests]) => {
                return requests.map(request => {
                    const beatmap = beatmaps.find(b => b.beatmapset_snapshot.beatmapset_id === request.beatmapset_id);
                    return {
                        ...request,
                        beatmap
                    };
                });
            }),
            catchError(err => {
                console.error(err);
                return of([]); // Return an empty array on error
            })
        );

        // Automatically handle loading state
        this.combined$.subscribe(() => {
            this.isLoading = false;
        }, () => {
            this.isLoading = false;
        });
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
