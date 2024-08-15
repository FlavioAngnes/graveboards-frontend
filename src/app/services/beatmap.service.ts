import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RequestFilter} from "../interfaces";
import {Observable} from "rxjs";
import {BeatmapsetDisplayData, BeatmapsetListing, BeatmapsetSnapshot} from "../models/Beatmapset";
import {EndpointEnum} from "../enums/endpoint.enum";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BeatmapService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getBeatmapsetListings(requestFilter?: RequestFilter | null): Observable<BeatmapsetListing[]> {
    let url = `${this.baseUrl}${EndpointEnum.LISTINGS}`;

    if (requestFilter) {
      const jsonRequestFilter = JSON.stringify(requestFilter);
      const encodedRequestFilter = encodeURIComponent(jsonRequestFilter);
      url += `?request_filter=${encodedRequestFilter}`;
    }

    return this.http.get<BeatmapsetListing[]>(url);
  }

  getBeatmapsetSnapshot(): Observable<BeatmapsetSnapshot[]> {
    return this.http.get<BeatmapsetSnapshot[]>(`${this.baseUrl}${EndpointEnum.LISTINGS}`);
  }

  getBeatmapsetDisplayData(): Observable<BeatmapsetDisplayData[]> {
    return this.http.get<BeatmapsetDisplayData[]>(`${this.baseUrl}${EndpointEnum.LISTINGS}`);
  }
}
