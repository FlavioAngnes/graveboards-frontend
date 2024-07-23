import { Component, Input, OnInit } from '@angular/core';
import { Beatmaps } from '../../models/beatmaps';
import { ServicesService } from '../../services.service';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-latest-requests',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './latest-requests.component.html',
  styleUrl: './latest-requests.component.scss',
  providers: [ServicesService]
})
export class LatestRequestsComponent implements OnInit {
  beatmaps$: Observable<Beatmaps[]>  | null = null;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private servicesService: ServicesService,
  ) {
    this.refresh();
  }
  
  ngOnInit(): void {
    this.servicesService.getBeatmaps().subscribe(
      (data: Beatmaps[]) => {
        this.isLoading = false;
        console.log('Data received:', data); // Log data to the console for debugging
      },
      (error) => {
        this.errorMessage = 'Error fetching beatmaps';
        this.isLoading = false;
        console.error('Error fetching beatmaps:', error); // Log error if any
      }
    );
  }

  refresh() {
  this.beatmaps$ = this.servicesService.getBeatmaps();
  }
}
