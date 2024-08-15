import {Component, Input} from '@angular/core';
import {DifficultyListComponent} from "../difficulty-list/difficulty-list.component";
import {NgForOf, NgIf, NgOptimizedImage, NgStyle, SlicePipe} from "@angular/common";
import {ColorUtils} from "../../../../utils/ColorUtils";

export interface DifficultyDetails {
    difficulty_rating: number,
    version: string,
}

@Component({
    selector: 'detailed-difficulty-list',
    standalone: true,
    imports: [
        DifficultyListComponent,
        NgForOf,
        NgIf,
        NgOptimizedImage,
        SlicePipe,
        NgStyle
    ],
    templateUrl: './detailed-difficulty-list.component.html',
    styleUrl: './detailed-difficulty-list.component.scss'
})
export class DetailedDifficultyListComponent {
    @Input() difficulties_to_show: number = 6; // How many difficulties should be displayed
    @Input() difficulties_details: DifficultyDetails[] = []; // The difficulties to display

    protected color: ColorUtils;

    constructor() {
        this.color = new ColorUtils();
    }
}
