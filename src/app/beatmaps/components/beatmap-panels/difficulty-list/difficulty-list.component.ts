import {Component, Input} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage, NgStyle, SlicePipe} from "@angular/common";
import {ColorUtils} from "../../../../utils/ColorUtils";

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
export class DifficultyListComponent {
    @Input() difficulties_to_show: number = 16; // How many difficulties should be displayed
    @Input() difficulties: number[] = []; // The difficulties to display

    protected color: ColorUtils;

    constructor() {
        this.color = new ColorUtils();
    }
}
