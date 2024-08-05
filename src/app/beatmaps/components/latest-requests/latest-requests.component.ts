import {Component, OnInit} from '@angular/core';
import {BeatmapsetListing} from '../../models/beatmap';
import {ServicesService} from '../../services.service';
import {Observable} from 'rxjs';
import {AsyncPipe, CommonModule, NgOptimizedImage} from '@angular/common';
import {BeatmapPanelComponent} from "../beatmap-panel/beatmap-panel.component";
import { RefreshService } from '../../refresh.service';

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
        private refreshService: RefreshService
    ) { }

    ngOnInit(): void {
        this.refreshService.refresh$.subscribe(() => {
            this.refresh();
          });

        this.refresh();
    }

    refresh() {
        this.isLoading = true;
        const requestFilter = {}
        this.beatmaps$ = this.servicesService.getBeatmapsetListings(requestFilter);
        this.isLoading = false;
    }
}


