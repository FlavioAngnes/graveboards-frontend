import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {BeatmapPanelComponent} from "../beatmap-panel/beatmap-panel.component";
import {catchError, combineLatest, Observable, of} from "rxjs";
import {RefreshService} from "../../../services/refresh.service";
import {BeatmapPanelHorizontalComponent} from "../beatmap-panel-horizontal/beatmap-panel-horizontal.component";
import {QueueRequest, QueueRequestWithBeatmap} from "../../../models/queueRequest";
import {BeatmapsetListing} from "../../../models/beatmap";
import {map} from "rxjs/operators";
import {BeatmapService} from "../../../services/beatmap.service";
import {RequestService} from "../../../services/request.service";

@Component({
    selector: 'manage-requests',
    standalone: true,
    imports: [
        AsyncPipe,
        BeatmapPanelComponent,
        NgForOf,
        NgIf,
        NgOptimizedImage,
        BeatmapPanelHorizontalComponent
    ],
    templateUrl: './manage-requests.component.html',
    styleUrl: './manage-requests.component.scss'
})
export class ManageRequestsComponent implements OnInit {
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

        this.beatmaps$ = this.beatmap.getBeatmapsetListings({}).pipe(
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
}
