import {Component, OnInit} from "@angular/core";
import {BeatmapQueueRequest, QueueRequest} from "../../models/QueueRequest";
import {combineLatestWith, Observable} from "rxjs";
import {BeatmapService} from "../../services/beatmap.service";
import {RequestService} from "../../services/request.service";
import {RefreshService} from "../../services/refresh.service";
import {map} from "rxjs/operators";
import {BeatmapsetListing} from "../../models/Beatmapset";
import {
  RequestBeatmapPanelHorizontalPlaceholderComponent
} from "../../components/loading-placeholders/request-beatmap-panel-horizontal-placeholder/request-beatmap-panel-horizontal-placeholder.component";
import {
  RequestBeatmapPanelHorizontalComponent
} from "../../components/beatmap-panels/request-beatmap-panel-horizontal/request-beatmap-panel-horizontal.component";
import {NgForOf, NgIf} from "@angular/common";
import {ScrollNearEndDirective} from "../../directives/scroll-near-end.directive";
import {
  InfiniteBeatmapsetListingComponent
} from "../../components/infinite-beatmapset-listing/infinite-beatmapset-listing.component";


@Component({
  selector: 'manage-requests',
  standalone: true,
  imports: [
    RequestBeatmapPanelHorizontalPlaceholderComponent,
    RequestBeatmapPanelHorizontalComponent,
    NgIf,
    ScrollNearEndDirective,
    NgForOf
  ],
  templateUrl: './manage-requests.component.html',
  styleUrl: './manage-requests.component.scss'
})
export class ManageRequestsComponent extends InfiniteBeatmapsetListingComponent implements OnInit {
  override panels_per_scroll: number = 16; // Number of panels to load per scroll
  override panel_height: number = 106; // panel height + gap in pixels

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

    if (typeof window === 'undefined') return;

    addEventListener('resize', () => {
      this.computePanelsPerScroll();
      this.loadBeatmaps(this.visibleRequests.length);
    });

    this.computePanelsPerScroll();
    this.refresh();
  }

  override refresh() {
    this.isLoading.next(true);

    this.beatmapService.getBeatmapsetListings()
    this.requestService.getRequests()

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
        this.visibleRequests = requests.slice(0, this.panels_per_scroll);
        this.totalBeatmaps = requests.length;
        this.isLoading.next(false);
      }
    )
  }

  override computePanelsPerScroll(): void {
    if (typeof window === 'undefined') return;

    this.panels_per_scroll = Math.ceil(window.innerHeight / this.panel_height);
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
    });
  }
}
