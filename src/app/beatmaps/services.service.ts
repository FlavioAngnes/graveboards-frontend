import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BeatmapsetListing } from './models/beatmap';
import { BeatmapsetSnapshot } from './models/beatmap';
import { BeatmapsetDisplayData } from './models/beatmap';
import { Observable } from 'rxjs';
import { EndpointEnum } from './endpoint.enum';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private baseUrl: string = 'http://localhost:4200/';

  constructor(private httpClient: HttpClient) { }

  getBeatmapsetListing(): Observable<BeatmapsetListing[]> {
    return this.httpClient.get<BeatmapsetListing[]>(`${this.baseUrl}${EndpointEnum.LISTINGS}`);
  }

  getBeatmapsetSnapshot(): Observable<BeatmapsetSnapshot[]> {
    return this.httpClient.get<BeatmapsetSnapshot[]>(`${this.baseUrl}${EndpointEnum.LISTINGS}`);
  }

  getBeatmapsetDisplayData(): Observable<BeatmapsetDisplayData[]> {
    return this.httpClient.get<BeatmapsetDisplayData[]>(`${this.baseUrl}${EndpointEnum.LISTINGS}`);
  }
}

