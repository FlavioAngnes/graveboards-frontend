import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {BaseBeatmapPanelComponent} from "../beatmap-panels/base-beatmap-panel/base-beatmap-panel.component";
import {catchError, combineLatest, combineLatestWith, Observable, of} from "rxjs";
import {RefreshService} from "../../../services/refresh.service";
import {
    RequestBeatmapPanelHorizontalComponent
} from "../beatmap-panels/request-beatmap-panel-horizontal/request-beatmap-panel-horizontal.component";
import {QueueRequest, BeatmapQueueRequest} from "../../../models/QueueRequest";
import {BeatmapsetListing} from "../../../models/Beatmapset";
import {map} from "rxjs/operators";
import {BeatmapService} from "../../../services/beatmap.service";
import {RequestService} from "../../../services/request.service";
import {
    BeatmapPanelPlaceholderComponent
} from "../loading-placeholders/beatmap-panel-placeholder/beatmap-panel-placeholder.component";

@Component({
    selector: 'manage-requests',
    standalone: true,
    imports: [
        AsyncPipe,
        BaseBeatmapPanelComponent,
        NgForOf,
        NgIf,
        NgOptimizedImage,
        RequestBeatmapPanelHorizontalComponent,
        BeatmapPanelPlaceholderComponent
    ],
    templateUrl: './manage-requests.component.html',
    styleUrl: './manage-requests.component.scss'
})
export class ManageRequestsComponent implements OnInit {
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

        this.beatmaps$ = this.beatmap.getBeatmapsetListings(null, 2).pipe(
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
    }
}
