import { Component } from '@angular/core';
import { ServicesService } from '../../services.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-request-button-dialog',
  standalone: true,
  imports: [MatIconModule,
    AsyncPipe,
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    RequestButtonDialogComponent,
    MatFormFieldModule,
    FormsModule],
  providers: [ServicesService,
    MatButtonModule, MatDialogModule],
  templateUrl: './request-button-dialog.component.html',
  styleUrl: './request-button-dialog.component.scss'
})
export class RequestButtonDialogComponent {
  value = '';
}
