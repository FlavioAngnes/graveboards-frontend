import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BeatmapsetListing} from "../../models/Beatmapset";
import {catchError, Observable, of} from "rxjs";
import {BeatmapService} from "../../services/beatmap.service";
import {RefreshService} from "../../services/refresh.service";
import {map} from "rxjs/operators";

@Component({
    selector: 'infinite-scroll-beatmap-panel-list',
    standalone: true,
    imports: [],
    templateUrl: './infinite-scroll-beatmap-panel-list.component.html',
    styleUrl: './infinite-scroll-beatmap-panel-list.component.scss'
})
export class InfiniteScrollBeatmapPanelListComponent implements OnInit, AfterViewInit {
    protected panels_per_scroll: number = 16; // Number of panels to load per scroll
    protected panel_height: number = 276; // panel height + gap in pixels

    protected visibleBeatmaps: BeatmapsetListing[] = [];
    protected beatmaps$: Observable<BeatmapsetListing[]> | null = null;
    protected totalBeatmaps: number = 0;

    isLoading: boolean = false;

    constructor(
        protected beatmap: BeatmapService,
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
        this.isLoading = true;

        this.beatmaps$ = this.beatmap.getBeatmapsetListings({}).pipe(
            catchError(err => {
                console.error(err);
                return of([]); // Return an empty array on error
            })
        );

        this.beatmaps$.subscribe(
            beatmaps => {
                this.computePanelsPerScroll();
                this.visibleBeatmaps = beatmaps.slice(0, this.panels_per_scroll);
                this.totalBeatmaps = beatmaps.length;
                this.isLoading = false;
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
        if (this.isLoading || this.visibleBeatmaps.length === this.totalBeatmaps) return;

        this.isLoading = true;

        this.beatmaps$!.pipe(
            map(beatmaps => {
                if (this.visibleBeatmaps.length === beatmaps.length) {
                    return [];
                }

                return beatmaps.slice(this.visibleBeatmaps.length, this.visibleBeatmaps.length + this.panels_per_scroll - offset);
            })
        ).subscribe(
            newBeatmaps => {
                this.visibleBeatmaps = [...this.visibleBeatmaps, ...newBeatmaps];
                this.isLoading = false;
            },
            error => {
                console.error('Error loading beatmaps:', error);
                this.isLoading = false;  // Reset loading state even if there's an error
            }
        );
    }
}
