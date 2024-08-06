import {Component, OnInit} from '@angular/core';
import {BeatmapsetListing} from '../../models/beatmap';
import {ServicesService} from '../../services.service';
import {combineLatest, Observable} from 'rxjs';
import {AsyncPipe, CommonModule, NgOptimizedImage} from '@angular/common';
import {BeatmapPanelComponent} from "../beatmap-panel/beatmap-panel.component";
import {QueueRequest, QueueRequestWithBeatmap} from "../../models/queueRequest";
import {map} from "rxjs/operators";


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
    ) {
    }

    ngOnInit(): void {
        this.refresh();

        // Combined observable to connect requests with their corresponding beatmaps
        if (this.beatmaps$ && this.requests$) {
            this.combined$ = combineLatest([this.beatmaps$, this.requests$]).pipe(
                map(([beatmaps, requests]) => {
                    return requests.map(request => {
                        const beatmap = beatmaps.find(b => b.beatmapset_snapshot.beatmapset_id === request.beatmapset_id);
                        console.log(beatmap);

                        return {
                            ...request,
                            beatmap
                        };
                    });
                })
            );

            // Usage example (subscribe to the combined observable)
            this.combined$.subscribe((result: QueueRequestWithBeatmap[]) => {
                console.log(result);
                // You can now work with the combined result
            });
        }
    }

    refresh() {
        if (typeof window !== 'undefined' && window.sessionStorage) {
            this.beatmaps$ = this.servicesService.getBeatmapsetListings({});
            this.requests$ = this.servicesService.getRequests();
        }
    }
}


