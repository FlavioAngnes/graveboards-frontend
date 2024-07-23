import { Component, Input, OnInit } from '@angular/core';
import { BeatmapsetListing } from '../../models/beatmap';
import { BeatmapsetSnapshot } from '../../models/beatmap';
import { BeatmapsetDisplayData } from '../../models/beatmap';
import { ServicesService } from '../../services.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-latest-requests',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './latest-requests.component.html',
  styleUrl: './latest-requests.component.scss',
  providers: [ServicesService]
})
export class LatestRequestsComponent implements OnInit {
  beatmaps$: Observable<BeatmapsetListing[]>  | null = null;
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
        console.log('Data received:', data); // Log data to the console for debugging
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
