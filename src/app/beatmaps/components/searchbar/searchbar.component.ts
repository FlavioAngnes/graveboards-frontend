import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 
import { RequestButtonDialogComponent } from '../request-button-dialog/request-button-dialog.component';
import { ProfileButtonComponent } from '../profile-button/profile-button.component';
import { ServicesService } from '../../services.service';
import { Router } from '@angular/router';
import { RefreshService } from '../../refresh.service';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [
    MatIconModule,
    AsyncPipe,
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    RequestButtonDialogComponent,
    ProfileButtonComponent
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss',
  providers: [MatButtonModule, MatDialogModule, ServicesService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchbarComponent {
  userAvatarUrl: string | null = null;
  isLoggedIn: boolean = false;

  constructor(
    private dialog: MatDialog, 
    private servicesService: ServicesService,
    private router: Router,
    private refreshService: RefreshService
  ) { }

  ngOnInit() { }

  openDialog(): void {
    const dialogRef = this.dialog.open(RequestButtonDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && typeof window !== 'undefined' && window.sessionStorage) {
        const beatmapsetId = this.parseBeatmapsetId(result.beatmapsetLink);

        if (!beatmapsetId) {
          console.error('Beatmapset ID could not be parsed');
          return;
        }

        const userInfo = sessionStorage.getItem('user');
        const user = userInfo ? JSON.parse(userInfo) : null;
        const userId = user.id;

        const queueId = 2;

        this.servicesService.postRequest(beatmapsetId, result.comment, result.mvChecked, userId, queueId).subscribe(response => {
          this.refreshService.triggerRefresh();
        });
      }
    });
  }

  parseBeatmapsetId(beatmapLink: string): number | null {
    const pattern = /beatmapsets\/(\d+)/
    const match = beatmapLink.match(pattern)

    if (match && match[1]) {
      return parseInt(match[1], 10);
    }

    return null;
  }
}
