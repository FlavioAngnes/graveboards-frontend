import {Injectable} from '@angular/core';
import {RequestFilter} from "../models/interfaces";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {EndpointEnum} from "../enums/endpoint.enum";
import {AuthService} from "./auth.service";
import {environment} from "../../environments/environment";
import {QueueRequest} from "../models/QueueRequest";

@Injectable({
    providedIn: 'root'
})
export class RequestService {
    requests$: Observable<QueueRequest[]> | null = null;

    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient, private auth: AuthService) {
    }

    getRequests(requestFilter?: RequestFilter | null): void {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.auth.getJWT()}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        let url = `${this.baseUrl}${EndpointEnum.REQUESTS}`;

        if (requestFilter) {
            const jsonRequestFilter = JSON.stringify(requestFilter);
            const encodedRequestFilter = encodeURIComponent(jsonRequestFilter);
            url += `?request_filter=${encodedRequestFilter}`;
        }

        this.requests$ = this.http.get<any>(url, {headers});
    }

    postRequest(beatmapsetId: number, comment: string, mvChecked: boolean, userId: number, queueId: number): Observable<HttpResponse<any>> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.auth.getJWT()}`,
            'Content-Type': 'application/json'
        });

        const body = {
            beatmapset_id: beatmapsetId,
            comment: comment,
            mv_checked: mvChecked,
            user_id: userId,
            queue_id: queueId
        }

        return this.http.post<any>(`${this.baseUrl}${EndpointEnum.REQUESTS}`, body, {
            headers: headers,
            observe: 'response'
        });
    }

    patchRequest(requestId: number, status: number): Observable<HttpResponse<any>> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.auth.getJWT()}`,
            'Content-Type': 'application/json'
        });

        const body = {
            status: status
        }

        return this.http.patch<any>(`${this.baseUrl}${EndpointEnum.REQUESTS}/${requestId}`, body, {
            headers: headers,
            observe: 'response'
        });
    }
}
