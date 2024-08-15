import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EndpointEnum} from "../enums/endpoint.enum";
import {AuthService} from "./auth.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private auth: AuthService) { }

  getUserOsuProfile(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.getJWT()}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.get<any>(`${this.baseUrl}${EndpointEnum.USER.replace('{userId}', userId.toString())}/profile`, {headers});
  }

  getUser(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.auth.getJWT()}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.get<any>(`${this.baseUrl}${EndpointEnum.USER.replace('{userId}', userId.toString())}`, {headers});
  }
}
