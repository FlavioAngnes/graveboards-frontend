import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ServicesService } from '../../services.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 
import { RequestButtonDialogComponent } from '../request-button-dialog/request-button-dialog.component';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [MatIconModule,
    AsyncPipe,
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    RequestButtonDialogComponent
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss',
  providers: [ServicesService,
    MatButtonModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchbarComponent {
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

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(RequestButtonDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
