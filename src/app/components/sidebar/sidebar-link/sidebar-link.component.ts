import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";
import {Router, ActivatedRoute, RouterLink} from '@angular/router';
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'sidebar-link',
    standalone: true,
    imports: [
        NgClass,
        RouterLink,
        MatIconModule
    ],
    templateUrl: './sidebar-link.component.html',
    styleUrl: './sidebar-link.component.scss'
})

export class SidebarLinkComponent {
    @Input() icon!: string;
    @Input() label!: string;
    @Input() href!: string;
    fullHref!: string;

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.fullHref = this.router.createUrlTree([this.href], {relativeTo: this.route}).toString();
    }

    isActive(route: string) {
        return this.router.url === route;
    }
}
