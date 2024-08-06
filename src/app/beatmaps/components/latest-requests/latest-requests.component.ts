import {Component, OnInit} from '@angular/core';
import {BeatmapsetListing} from '../../models/beatmap';
import {ServicesService} from '../../services.service';
import {catchError, combineLatest, Observable, of} from 'rxjs';
import {AsyncPipe, CommonModule, NgOptimizedImage} from '@angular/common';
import {BeatmapPanelComponent} from "../beatmap-panel/beatmap-panel.component";
import {QueueRequest, QueueRequestWithBeatmap} from "../../models/queueRequest";
import {map} from "rxjs/operators";
import {RefreshService} from "../../refresh.service";

@Component({
    selector: 'app-latest-requests',
    standalone: true,
    imports: [CommonModule, AsyncPipe, NgOptimizedImage, BeatmapPanelComponent],
    templateUrl: './latest-requests.component.html',
    styleUrl: './latest-requests.component.scss',
    providers: [ServicesService]
})
export class LatestRequestsComponent implements OnInit {
    beatmaps$: Observable<BeatmapsetListing[]> | null = null;
    requests$: Observable<QueueRequest[]> | null = null;
    combined$: Observable<QueueRequestWithBeatmap[]> | null = null;
    isLoading = true;
    errorMessage: string | null = null;

    constructor(
        private servicesService: ServicesService,
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

        this.beatmaps$ = this.servicesService.getBeatmapsetListings({}).pipe(
            catchError(err => {
                console.error(err);
                return of([]); // Return an empty array on error
            })
        );

        this.requests$ = this.servicesService.getRequests().pipe(
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
                }).reverse(); // Reverse the array here
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