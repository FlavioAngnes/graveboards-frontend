import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage, NgStyle, SlicePipe} from "@angular/common";
import {Subscription, BehaviorSubject} from "rxjs";
import {ColorUtils} from "../../../utils/ColorUtils";

@Component({
    selector: 'difficulty-list',
    standalone: true,
    imports: [
        NgForOf,
        NgIf,
        NgOptimizedImage,
        SlicePipe,
        NgStyle
    ],
    templateUrl: './difficulty-list.component.html',
    styleUrl: './difficulty-list.component.scss'
})
export class DifficultyListComponent implements OnInit, OnDestroy {
    readonly maxDifficultiesToShow: number = 16;
    readonly difficultyWidth: number = 7; // Estimated width of a difficulty element including gap.
    private readonly remainingDifficultiesTextWidth: number = 28; // Estimated width of 2 digit remaining difficulties text.
    private readonly difficultyIconWidth: number = 20; // Width of a difficulty icon including gap.

    private difficultiesToShowSubject = new BehaviorSubject<number>(0);
    private subscription: Subscription | null = null;

    difficultiesToShow: number = 16;
    @Input() difficulties: number[] = []; // The difficulties to display

    protected color: ColorUtils = new ColorUtils();

    constructor() {
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', this.onResize.bind(this));
        }
    }

    ngOnInit() {
        this.subscription = this.difficultiesToShowSubject.subscribe(value => {
            this.difficultiesToShow = value;
        });

        this.computeDifficultiesToShow();
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', this.onResize.bind(this));
        }
    }

    private onResize() {
        this.computeDifficultiesToShow();
    }

    computeDifficultiesToShow() {
        if (typeof window === 'undefined') return;

        const difficultyList = document.querySelector('.difficulty-list');

        if (!difficultyList) {
            this.difficultiesToShowSubject.next(0);
            return;
        }

        const fullWidth = parseInt(window.getComputedStyle(difficultyList).width);

        // Valid width is the full width minus the width of the difficulty icon and the remaining difficulties text.
        // This is because we want to show as many difficulties as possible instead of showing text.
        const validWidth = Math.max(fullWidth - this.difficultyIconWidth - this.difficultyWidth - this.remainingDifficultiesTextWidth, this.difficultyWidth);

        const difficultiesToShow = Math.min(
            Math.floor(validWidth / this.difficultyWidth),
            this.maxDifficultiesToShow
        );

        const remainingSpace = validWidth - difficultiesToShow * this.difficultyWidth;

        this.difficultiesToShowSubject.next(
            remainingSpace >= this.difficultyIconWidth ? difficultiesToShow : Math.max(difficultiesToShow - 1, 0)
        );
    }
}