import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../auth.service'
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@Component({
  standalone: true,
  selector: 'profile-button',
  templateUrl: './profile-button.component.html',
  styleUrls: ['./profile-button.component.scss'],
  imports: [
    CommonModule,
    MatTooltipModule,
    ClickOutsideDirective
  ]
})
export class ProfileButtonComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  avatarUrl!: string;
  tooltipText: string = 'Click to Login';
  dropdownVisible = false;
  private subscriptions: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router, private changeDetectorRef: ChangeDetectorRef) {}

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
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onProfileButtonClick(): void {
    if (this.isLoggedIn) {
      this.dropdownVisible = !this.dropdownVisible;
    } else {
      this.login();
    }
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