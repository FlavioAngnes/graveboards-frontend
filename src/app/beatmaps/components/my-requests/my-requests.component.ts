import { Component, OnInit } from '@angular/core';
import { BeatmapsetListing } from '../../models/beatmap';
import { ServicesService } from '../../services.service';
import { Observable } from 'rxjs';
import { RequestFilter } from '../../interfaces';
import {AsyncPipe, CommonModule, NgOptimizedImage} from '@angular/common';
import {BeatmapPanelComponent} from "../beatmap-panel/beatmap-panel.component";

@Component({
  selector: 'app-my-requests',
  standalone: true,
  imports: [CommonModule, AsyncPipe, NgOptimizedImage, BeatmapPanelComponent],
  templateUrl: './my-requests.component.html',
  styleUrl: './my-requests.component.scss',
  providers: [ServicesService]
})
export class MyRequestsComponent implements OnInit {
  beatmaps$: Observable<BeatmapsetListing[]>  | null = null;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private servicesService: ServicesService,
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const requestFilter = this.getRequestFilter();

      this.beatmaps$ = this.servicesService.getBeatmapsetListings(requestFilter);
    }
  }

  getRequestFilter(): RequestFilter {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const userInfo = sessionStorage.getItem('user')
      const user = userInfo ? JSON.parse(userInfo) : null;
      const userId = user.id;

      const requestFilter: RequestFilter = {
        user_id: { eq: userId }
      };

      return requestFilter;
    } else {
      return {};
    }
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
