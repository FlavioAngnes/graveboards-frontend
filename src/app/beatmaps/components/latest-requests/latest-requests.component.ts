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

  getCategory(difficulty: number): string {
    if (difficulty < 2) {
      return '../../assets/icons/easy.png';
    } else if (difficulty >= 2 && difficulty < 3) {
      return './../assets/icons/normal.png';
    } else if (difficulty >= 3 && difficulty < 4) {
      return './../assets/icons/hard.png';
    } else if (difficulty >= 4 && difficulty < 5) {
      return './../assets/icons/insane.png';
    } else if (difficulty >= 5 && difficulty < 6) {
      return '../../assets/icons/expert.png';
    } else if (difficulty >= 6) {
      return '../../assets/icons/expertplus.png';
    } else {
      return ''; 
    }
  }
}
