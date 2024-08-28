import {Component, OnInit} from "@angular/core";
import {BeatmapQueueRequest, QueueRequest} from "../../models/QueueRequest";
import {combineLatestWith, Observable} from "rxjs";
import {BeatmapService} from "../../services/beatmap.service";
import {RequestService} from "../../services/request.service";
import {RefreshService} from "../../services/refresh.service";
import {map} from "rxjs/operators";
import {BeatmapsetListing} from "../../models/Beatmapset";
import {RequestFilter} from "../../models/interfaces";
import {
  BeatmapPanelPlaceholderComponent
} from "../../components/loading-placeholders/beatmap-panel-placeholder/beatmap-panel-placeholder.component";
import {
  RequestBeatmapPanelComponent
} from "../../components/beatmap-panels/request-beatmap-panel/request-beatmap-panel.component";
import {ScrollNearEndDirective} from "../../directives/scroll-near-end.directive";
import {NgForOf, NgIf} from "@angular/common";
import {
  InfiniteBeatmapsetListingComponent
} from "../../components/infinite-beatmapset-listing/infinite-beatmapset-listing.component";

@Component({
  selector: 'my-requests',
  standalone: true,
  imports: [
    BeatmapPanelPlaceholderComponent,
    RequestBeatmapPanelComponent,
    ScrollNearEndDirective,
    NgIf,
    NgForOf
  ],
  templateUrl: './my-requests.component.html',
  styleUrl: './my-requests.component.scss',
})
export class MyRequestsComponent extends InfiniteBeatmapsetListingComponent implements OnInit {
  visibleRequests: BeatmapQueueRequest[] = [];

  combined$: Observable<BeatmapQueueRequest[]> | null = null;

  constructor(
    beatmap: BeatmapService,
    protected requestService: RequestService,
    refreshService: RefreshService
  ) {
    super(beatmap, refreshService);
  }

  override ngOnInit(): void {
    this.refreshService.refresh$.subscribe(() => {
      this.refresh();
    });

    this.isLoading.next(true);
  }

  override refresh() {
    const requestFilter = this.getRequestFilter();
    this.isLoading.next(true);

    this.beatmapService.getBeatmapsetListings(requestFilter);
    this.requestService.getRequests(requestFilter);

    this.combined$ = this.requestService.requests$!.pipe(
      combineLatestWith(this.beatmapService.beatmaps$!),
      map(([requests, beatmaps]) => {
          return requests.map((request: QueueRequest) => {
            const beatmap = beatmaps.find((beatmap: BeatmapsetListing) => beatmap.beatmapset_snapshot.beatmapset_id === request.beatmapset_id);
            return {beatmap, request} as BeatmapQueueRequest;
          });
        }
      )
    );

    this.combined$.subscribe(
      requests => {
        this.computePanelsPerScroll();
        this.visibleRequests = requests.slice(0, this.panels_per_scroll);
        this.totalBeatmaps = requests.length;
        this.isLoading.next(false);
      }
    )
  }

  override loadBeatmaps(offset: number = 0): void {
    if (this.isLoading.value || this.visibleRequests.length === this.totalBeatmaps) return;

    this.isLoading.next(true);

    this.combined$!.pipe(
      map(requests => {
        if (this.visibleRequests.length === requests.length) {
          return [];
        }

        return requests.slice(this.visibleRequests.length, this.visibleRequests.length + this.panels_per_scroll - offset);
      })
    ).subscribe({
        next: newRequests => {
          this.visibleRequests = [...this.visibleRequests, ...newRequests];
          this.isLoading.next(false);
        }
        ,
        error: error => {
          console.error('Error loading beatmaps:', error);
          this.isLoading.next(false);  // Reset loading state even if there's an error
        }
      }
    );
  }

  getRequestFilter(): RequestFilter {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const userInfo = sessionStorage.getItem('user')
      const user = userInfo ? JSON.parse(userInfo) : null;
      const userId = user.id;

      return {
        user_id: {eq: userId}
      };
    } else {
      return {};
    }
  }
}
