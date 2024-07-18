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
  providers: [ServicesService],
})
export class LatestRequestsComponent implements OnInit {
  beatmaps$: Observable<Beatmaps[]>  | null = null;

  constructor(
    private servicesService: ServicesService,
  ) {
    this.refresh();
  }
  
  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
  this.beatmaps$ = this.servicesService.getBeatmaps();
  }
}
