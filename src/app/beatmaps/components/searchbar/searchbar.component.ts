import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ServicesService } from '../../services.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 
import { RequestButtonDialogComponent } from '../request-button-dialog/request-button-dialog.component';
import { ProfileButtonComponent } from '../profile-button/profile-button.component';

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
  providers: [ServicesService, MatButtonModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchbarComponent {
  userAvatarUrl: string | null = null;
  isLoggedIn: boolean = false;

  constructor(private servicesService: ServicesService, private dialog: MatDialog) { }

  ngOnInit() { }

  openDialog(): void {
    const dialogRef = this.dialog.open(RequestButtonDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Result:', result);
    });
  }
}
