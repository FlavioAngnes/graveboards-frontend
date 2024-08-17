import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {TopbarComponent} from "./components/topbar/topbar.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        TopbarComponent,
        SidebarComponent

    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})

export class AppComponent {
    title = 'routing-app';
}
