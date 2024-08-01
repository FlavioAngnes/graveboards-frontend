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
    if (difficulty < 0) {
      return 'beginner';
    } else if (difficulty >= 1 && difficulty < 2) {
      return 'easy';
    } else if (difficulty >= 2 && difficulty < 3) {
      return 'normal';
    } else if (difficulty >= 3 && difficulty < 4) {
      return 'hard';
    } else if (difficulty >= 4 && difficulty < 5) {
      return 'insane';
    } else if (difficulty >= 5 && difficulty < 6) {
      return 'expert';
    } else if (difficulty >= 6 && difficulty < 7) {
      return 'extra';
    } else if (difficulty >= 7 && difficulty < 8) {
      return 'extra-plus';
    } else if (difficulty >= 8 && difficulty < 9) {
      return 'ultra';
    } else if (difficulty >= 9 && difficulty < 10) {
      return 'impossible';
    } else if (difficulty >= 10) {
      return 'unrankeable';
    } else {
      return ''; 
    }
  }
}
