import {AsyncPipe, CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {RequestButtonDialogComponent} from '../request-button-dialog/request-button-dialog.component';
import {ProfileButtonComponent} from '../profile-button/profile-button.component';
import {RefreshService} from '../../../services/refresh.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorResponse} from '../../../interfaces';
import {ErrorResponseType} from '../../../enums/request-response.enum';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SearchbarComponent} from "./searchbar/searchbar.component";
import {AuthService} from "../../../services/auth.service";
import {Subscription} from "rxjs";
import {filter} from "rxjs/operators";
import {NavigationEnd, Router} from "@angular/router";
import {RequestService} from "../../../services/request.service";

@Component({
    selector: 'topbar',
    standalone: true,
    imports: [
        MatIconModule,
        AsyncPipe,
        CommonModule,
        MatButtonModule,
        MatMenuModule,
        MatDialogModule,
        RequestButtonDialogComponent,
        ProfileButtonComponent,
        SearchbarComponent,
    ],
    templateUrl: './topbar.component.html',
    styleUrl: './topbar.component.scss',
    providers: [MatButtonModule, MatDialogModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent implements OnInit, OnDestroy {
    isLoggedIn: boolean = false;
    private subscriptions: Subscription = new Subscription();

    constructor(
        private dialog: MatDialog,
        private request: RequestService,
        private refreshService: RefreshService,
        private _snackBar: MatSnackBar,
        private authService: AuthService,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.subscriptions.add(this.authService.isLoggedIn().subscribe(value => {
            this.isLoggedIn = value;
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

                this.request.postRequest(beatmapsetId, result.comment, result.mvChecked, userId, queueId).subscribe({
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
