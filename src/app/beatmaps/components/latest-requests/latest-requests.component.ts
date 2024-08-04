import {Component, OnInit} from '@angular/core';
import {BeatmapsetListing} from '../../models/beatmap';
import {ServicesService} from '../../services.service';
import {Observable} from 'rxjs';
import {AsyncPipe, CommonModule, NgOptimizedImage} from '@angular/common';
import {BeatmapPanelComponent} from "../beatmap-panel/beatmap-panel.component";

@Component({
    selector: 'app-latest-requests',
    standalone: true,
    imports: [CommonModule, AsyncPipe, NgOptimizedImage, BeatmapPanelComponent],
    templateUrl: './latest-requests.component.html',
    styleUrl: './latest-requests.component.scss',
    providers: [ServicesService],
})

export class LatestRequestsComponent implements OnInit {
    beatmaps$: Observable<BeatmapsetListing[]> | null = null;
    isLoading = true;
    errorMessage: string | null = null;

    constructor(
        private servicesService: ServicesService,
    ) {
        this.refresh();
    }

    ngOnInit(): void {
        this.servicesService.getBeatmapsetListing().subscribe(
            (data: BeatmapsetListing[]) => {
                this.isLoading = false;
            },
            (error) => {
                this.errorMessage = 'Error fetching beatmaps';
                this.isLoading = false;
                console.error('Error fetching beatmaps:', error); // Log error if any
            }
        );
    }

    refresh() {
        this.beatmaps$ = this.servicesService.getBeatmapsetListing();
    }
}


