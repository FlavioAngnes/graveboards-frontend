import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BeatmapsetListing } from './models/beatmap';
import { BeatmapsetSnapshot } from './models/beatmap';
import { BeatmapsetDisplayData } from './models/beatmap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EndpointEnum } from './endpoint.enum';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private baseUrl: string = 'http://localhost:4200/';
  private apiKey: string = environment.apiKey;
  private state: string | null = null;

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

  getAuthorizationUrl(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}${EndpointEnum.LOGIN}`).pipe(
      map(response => {
        const authorizationUrl = response.authorization_url;
        const url = new URL(authorizationUrl);
        const state = url.searchParams.get('state');

        if (typeof window !== 'undefined' && window.sessionStorage) {
          sessionStorage.setItem('state', `${state}`);
        }

        return response;
      })
    );
  }

  postToken(code: string): Observable<any> {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      this.state = sessionStorage.getItem('state');
      console.log("state:", this.state);
    }

    let body = new HttpParams()
      .set('code', code)
      .set('state', `${this.state}`);

    const headers = new HttpHeaders({
      'X-API-KEY': `${this.apiKey}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  
    return this.httpClient.post((`${this.baseUrl}${EndpointEnum.TOKEN}`), body.toString(), { headers });
  };

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('state');
  }

  logout(): void {
    sessionStorage.clear();
    localStorage.clear();
    console.log(sessionStorage.getItem('state'));
    // Optionally notify the server about logout
  }
}