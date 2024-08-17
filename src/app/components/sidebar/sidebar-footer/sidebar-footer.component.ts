import {Component} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {NgOptimizedImage} from "@angular/common";

@Component({
    selector: 'sidebar-footer',
    standalone: true,
    imports: [
        MatIcon,
        NgOptimizedImage
    ],
    templateUrl: './sidebar-footer.component.html',
    styleUrl: './sidebar-footer.component.scss'
})

export class SidebarFooterComponent {

}
