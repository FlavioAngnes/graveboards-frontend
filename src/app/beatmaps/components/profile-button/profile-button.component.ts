import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-profile-button',
  standalone: true,
  imports: [MatIconModule,
    AsyncPipe,
    CommonModule,
    MatButtonModule,
    MatMenuModule],
    providers: [ServicesService],
  templateUrl: './profile-button.component.html',
  styleUrl: './profile-button.component.scss'
})
export class ProfileButtonComponent {
  userAvatarUrl: string | null = null;
  isLoggedIn: boolean = false;

  constructor(private servicesService: ServicesService) { }

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    if (this.servicesService.isLoggedIn()) {
      this.isLoggedIn = true;
      const userId: number = Number(sessionStorage.getItem('user_id'));

      this.servicesService.getUserProfile(userId).subscribe(
        userProfile => {
          this.userAvatarUrl = userProfile.avatar_url;
        }
      );
    } else {
      this.isLoggedIn = false;
      this.userAvatarUrl = null;
    }
  }

  onLoginButtonClick(): void {
    if (this.isLoggedIn) {
      this.servicesService.logout();
      this.isLoggedIn = false;
      this.userAvatarUrl = null;
    } else {
      this.servicesService.getAuthorizationUrl().subscribe(
        response => {
          let authorizationUrl = response.authorization_url;
          window.location.href = authorizationUrl;
        }
      );
    }
  }

  onLogout(): void {
    this.servicesService.logout();
    this.isLoggedIn = false;
    this.userAvatarUrl = null;
  }
}
