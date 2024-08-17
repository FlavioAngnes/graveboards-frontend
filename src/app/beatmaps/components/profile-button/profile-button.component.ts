import {Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {AuthService} from '../../../services/auth.service'
import {CommonModule} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ClickOutsideDirective} from '../../../directives/click-outside.directive';
import {MatSlider, MatSliderThumb} from "@angular/material/slider";
import {MatIcon} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {AudioService} from "../../../services/audio.service";

@Component({
    standalone: true,
    selector: 'profile-button',
    templateUrl: './profile-button.component.html',
    styleUrls: ['./profile-button.component.scss'],
    imports: [
        CommonModule,
        MatTooltipModule,
        ClickOutsideDirective,
        MatSlider,
        MatSliderThumb,
        MatIcon,
        FormsModule
    ]
})
export class ProfileButtonComponent implements OnInit, OnDestroy {
    isLoggedIn = false;
    avatarUrl!: string;
    tooltipText: string = 'Click to Login';
    dropdownVisible = false;
    private subscriptions: Subscription = new Subscription();
    value: number = 0;

    constructor(private authService: AuthService, private router: Router, protected audio: AudioService, private changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.subscriptions.add(this.authService.isLoggedIn().subscribe(isLoggedIn => {
            this.isLoggedIn = isLoggedIn;
            this.updateAvatarUrl();
            this.updateTooltip();
        }));

        this.subscriptions.add(this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.changeDetectorRef.detectChanges();
        }));

        this.value = this.audio.getVolume() * 100;
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    onProfileButtonClick(): void {
        if (this.isLoggedIn) {
            this.toggleDropdown();
        } else {
            this.login();
        }
    }

    toggleDropdown(): void {
        this.dropdownVisible = !this.dropdownVisible;
    }

    closeDropdown(): void {
        this.dropdownVisible = false;
    }

    updateAvatarUrl(): void {
        this.authService.getAvatarUrl().subscribe(url => {
            this.avatarUrl = url;
        });
    }

    updateTooltip(): void {
        this.tooltipText = this.isLoggedIn ? 'Profile Options' : 'Click to Login';
    }

    login(): void {
        if (!this.isLoggedIn) {
            this.authService.login();
        }
    }

    logout(): void {
        this.dropdownVisible = false;
        this.authService.logout();
    }
}