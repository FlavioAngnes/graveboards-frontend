import {AsyncPipe, CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {SidebarLinkComponent} from "./sidebar-link/sidebar-link.component";
import {SidebarSectionComponent} from "./sidebar-section/sidebar-section.component";
import {AuthService} from "../../auth.service";
import {Subscription} from "rxjs";
import {SidebarFooterComponent} from "./sidebar-footer/sidebar-footer.component";

@Component({
    selector: 'sidebar',
    standalone: true,
    imports: [CommonModule, AsyncPipe,
        MatListModule,
        MatButtonModule,
        MatIconModule, SidebarLinkComponent, SidebarSectionComponent, SidebarFooterComponent
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {
    isLoggedIn!: boolean;
    private subscriptions: Subscription = new Subscription();

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.subscriptions.add(this.authService.isLoggedIn().subscribe(isLoggedIn => {
            this.isLoggedIn = isLoggedIn;
        }));
    }
}
