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
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from '../../interfaces';
import { ErrorResponseType } from '../../request-response.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth.service';

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
    private refreshService: RefreshService,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit() { }

  openDialog(): void {
    const dialogRef = this.dialog.open(RequestButtonDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && typeof window !== 'undefined' && window.sessionStorage) {
        const userInfo = sessionStorage.getItem('user');
        const user = userInfo ? JSON.parse(userInfo) : null;

        if (!user) {
          this._snackBar.open('You must be loged in first!', 'Error', {
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
          });

          return;
        }

        this._snackBar.open('Request submitted!', 'Confirm', {
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
        });

        const beatmapsetId = this.parseBeatmapsetId(result.beatmapsetLink);

        if (!beatmapsetId) {
          console.error('Beatmapset ID could not be parsed');
          return;
        }

        const userId = user.id;
        const queueId = 2;

        this.servicesService.postRequest(beatmapsetId, result.comment, result.mvChecked, userId, queueId).subscribe({
          next: response => {
            switch (response.status) {
              case 201:
                this.refreshService.triggerRefresh();
                break;
            }
          },
          error: (error: HttpErrorResponse) => {
            const response: ErrorResponse = error.error;

            switch (error.status) {
              case 400:
                if (response.error_type == ErrorResponseType.ALREADY_RANKED) {
                  this._snackBar.open('The map is already ranked on osu!', 'Error', {
                    horizontalPosition: 'end',
                    verticalPosition: 'bottom',
                  });
                }
                break;

              case 409:
                if (response.error_type == ErrorResponseType.ALREADY_REQUESTED) {
                  this._snackBar.open('The map has already been requested!', 'Error', {
                    horizontalPosition: 'end',
                    verticalPosition: 'bottom',
                  });
                }
                break;
            }
          }
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
