import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BeatmapsetListing} from "../../models/Beatmapset";
import {BehaviorSubject, catchError, of, tap} from "rxjs";
import {BeatmapService} from "../../services/beatmap.service";
import {RefreshService} from "../../services/refresh.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'infinite-scroll-beatmap-panel-list',
  standalone: true,
  imports: [],
  templateUrl: './infinite-beatmapset-listing.component.html',
  styleUrl: './infinite-beatmapset-listing.component.scss'
})
export class InfiniteBeatmapsetListingComponent implements OnInit, AfterViewInit {
  protected panels_per_scroll: number = 16; // Number of panels to load per scroll
  protected panel_height: number = 276; // panel height + gap in pixels

  protected visibleBeatmaps: BeatmapsetListing[] = [];
  protected totalBeatmaps: number = 0;

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    protected beatmapService: BeatmapService,
    protected refreshService: RefreshService
  ) {
  }

  ngOnInit(): void {
    this.refreshService.refresh$.subscribe(() => {
      this.refresh();
    });

    this.refresh();
  }

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;
    addEventListener('resize', () => {
      this.computePanelsPerScroll();
      this.loadBeatmaps(this.visibleBeatmaps.length);
    });

    this.refresh();
  }

  protected refresh() {
    this.isLoading.next(true);

    this.beatmapService.getBeatmapsetListings();

    this.beatmapService.beatmaps$!.subscribe(
      beatmaps => {
        this.computePanelsPerScroll();
        this.visibleBeatmaps = beatmaps.slice(0, this.panels_per_scroll);
        this.totalBeatmaps = beatmaps.length;
        this.isLoading.next(false);
      }
    )
  }

  protected computePanelsPerScroll(): void {
    if (typeof window === 'undefined') return;

    const gridComputedStyle = window.getComputedStyle(document.querySelector('.grid-container')!);
    const gridColumns = gridComputedStyle.gridTemplateColumns.split(' ').length;

    this.panels_per_scroll = Math.ceil(window.innerHeight / this.panel_height) * gridColumns;
  }

  protected loadBeatmaps(offset: number = 0): void {
    // Prevent loading if already loading or if all beatmaps are loaded
    if (this.isLoading.value || this.visibleBeatmaps.length === this.totalBeatmaps) return;

    // Set loading to true
    this.isLoading.next(true);

    this.beatmapService.beatmaps$!.pipe(
      map(beatmaps => {
        // Load beatmaps dependent on computed value
        // Offset is needed when the window is resized, to prevent loading too many beatmaps
        return beatmaps.slice(this.visibleBeatmaps.length, this.visibleBeatmaps.length + this.panels_per_scroll - offset);
      }),
      tap(
        newBeatmaps => {
          // Add new beatmaps to visible beatmaps
          this.visibleBeatmaps = [...this.visibleBeatmaps, ...newBeatmaps];

          // Set loading to false
          this.isLoading.next(false);
        }
      ),
      catchError(err => {
        // Log error and set loading to false
        console.error('Error loading beatmaps:', err);
        this.isLoading.next(false);

        // Return an empty array on error
        return of([]);
      })
    ).subscribe();
  }
}
