import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Beatmaps } from './models/beatmaps';
import { Observable } from 'rxjs';
import { EndpointEnum } from './endpoint.enum';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private baseUrl: string = 'http://localhost:4200/';

  constructor(private httpClient: HttpClient) { }

  getBeatmaps(): Observable<Beatmaps[]> {
    return this.httpClient.get<Beatmaps[]>(`${this.baseUrl}${EndpointEnum.BEATMAPS}`);
  }
    
}


// class EndpointEnum(Enum):
//   BEATMAPS = "api/v1/beatmaps"
//   LEADERBOARDS = "api/v1/leaderboards"

// beatmaps_endpoint = EndpointEnum.BEATMAPS

// return this.httpClient.get(beatmaps_endpoint.value)