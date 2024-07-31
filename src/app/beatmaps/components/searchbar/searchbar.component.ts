import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ServicesService } from '../../services.service';


@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [MatIconModule,
    AsyncPipe,
    CommonModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss',
  providers: [ServicesService],
})
export class SearchbarComponent {
  
}
