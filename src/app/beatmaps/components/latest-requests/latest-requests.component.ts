import {Component, OnInit} from '@angular/core';
import {BeatmapsetListing} from '../../../models/Beatmapset';
import {catchError, Observable, of} from 'rxjs';
import {AsyncPipe, CommonModule, NgOptimizedImage} from '@angular/common';
import {BaseBeatmapPanelComponent} from "../beatmap-panels/base-beatmap-panel/base-beatmap-panel.component";
import {RefreshService} from "../../../services/refresh.service";
import {BeatmapService} from "../../../services/beatmap.service";

@Component({
    selector: 'app-latest-requests',
    standalone: true,
    imports: [CommonModule, AsyncPipe, NgOptimizedImage, BaseBeatmapPanelComponent],
    templateUrl: './latest-requests.component.html',
    styleUrl: './latest-requests.component.scss',
})
export class LatestRequestsComponent implements OnInit {
    beatmaps$: Observable<BeatmapsetListing[]> | null = null;
    isLoading = true;

    constructor(
        private beatmap: BeatmapService,
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
    }
}