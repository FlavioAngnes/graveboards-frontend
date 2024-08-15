import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BeatmapsetListing} from './models/beatmap';
import {BeatmapsetSnapshot} from './models/beatmap';
import {BeatmapsetDisplayData} from './models/beatmap';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {EndpointEnum} from './endpoint.enum';
import {environment} from '../../environments/environment';
import {TokenResponse, RequestFilter} from './interfaces';


@Injectable({
    providedIn: 'root'
})
export class ServicesService {

    private baseUrl: string = environment.baseUrl;
    private state: string | null = null;
    

    constructor(private httpClient: HttpClient) {
    }

    getJWT(): string | null {
        if (typeof window !== 'undefined' && window.sessionStorage) {
            const token = sessionStorage.getItem('token');
            
            return token
        } else {
            return null;
        }
    }

    getBeatmapsetListings(requestFilter?: RequestFilter | null): Observable<BeatmapsetListing[]> {
        let url = `${this.baseUrl}${EndpointEnum.LISTINGS}`;

        if (requestFilter) {
            const jsonRequestFilter = JSON.stringify(requestFilter);
            const encodedRequestFilter = encodeURIComponent(jsonRequestFilter);
            url += `?request_filter=${encodedRequestFilter}`;
        }

        return this.httpClient.get<BeatmapsetListing[]>(url);
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

    getUserOsuProfile(userId: number): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.getJWT()}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        return this.httpClient.get<any>(`${this.baseUrl}${EndpointEnum.USER.replace('{userId}', userId.toString())}/profile`, {headers});
    }

    getUser(userId: number): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.getJWT()}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        return this.httpClient.get<any>(`${this.baseUrl}${EndpointEnum.USER.replace('{userId}', userId.toString())}`, {headers});
    }

    getRequests(requestFilter?: RequestFilter | null): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.getJWT()}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        let url = `${this.baseUrl}${EndpointEnum.REQUESTS}`;

        if (requestFilter) {
            const jsonRequestFilter = JSON.stringify(requestFilter);
            const encodedRequestFilter = encodeURIComponent(jsonRequestFilter);
            url += `?request_filter=${encodedRequestFilter}`;
        }

        return this.httpClient.get<any>(url, {headers});
    }

    postToken(code: string): Observable<TokenResponse> {
        if (typeof window !== 'undefined' && window.sessionStorage) {
            this.state = sessionStorage.getItem('state');
        }

        let body = new HttpParams()
            .set('code', code)
            .set('state', `${this.state}`);

        return this.httpClient.post<TokenResponse>(`${this.baseUrl}${EndpointEnum.TOKEN}`, body.toString());
    };

    postRequest(beatmapsetId: number, comment: string, mvChecked: boolean, userId: number, queueId: number): Observable<HttpResponse<any>> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.getJWT()}`,
            'Content-Type': 'application/json'
        });

        const body = {
            beatmapset_id: beatmapsetId,
            comment: comment,
            mv_checked: mvChecked,
            user_id: userId,
            queue_id: queueId
        }

        return this.httpClient.post<any>(`${this.baseUrl}${EndpointEnum.REQUESTS}`, body, {
            headers: headers,
            observe: 'response'
        });
    }

    patchRequest(requestId: number, status: number): Observable<HttpResponse<any>> {
        console.log('patchRequest', requestId, status);

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.getJWT()}`,
            'Content-Type': 'application/json'
        });

        const body = {
            status: status
        }

        return this.httpClient.patch<any>(`${this.baseUrl}${EndpointEnum.REQUESTS}/${requestId}`, body, {
            headers: headers,
            observe: 'response'
        });
    }
}