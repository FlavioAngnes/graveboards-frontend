import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {EndpointEnum} from "../enums/endpoint.enum";
import {map} from "rxjs/operators";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {TokenResponse} from "../models/interfaces";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl: string = environment.baseUrl;
    private state: string | null = null;

    private loggedIn = new BehaviorSubject<boolean>(false);
    private avatarUrl = new BehaviorSubject<string>('./assets/icons/person.svg');
    private admin = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient, private router: Router) {
        if (typeof window !== 'undefined' && window.sessionStorage) {
            const user = sessionStorage.getItem('user');

            if (user) {
                const userJson = JSON.parse(user);

                if (userJson) {
                    this.loggedIn.next(true);
                    this.avatarUrl.next(userJson.profile.avatar_url);
                    this.admin.next(userJson.roles.some((role: any) => role.name === 'admin'));
                }
            }
        }
    }

    isLoggedIn(): Observable<boolean> {
        return this.loggedIn.asObservable();
    }

    isAdmin() {
        return this.admin.asObservable();
    }

    getAvatarUrl(): Observable<string> {
        return this.avatarUrl.asObservable();
    }

    login(): void {
        this.getAuthorizationUrl().subscribe(response => {
            window.location.href = response.authorization_url;
        });
    }

    logout(): void {
        sessionStorage.clear();
        localStorage.clear();

        this.loggedIn.next(false);
        this.avatarUrl.next('./assets/icons/person.svg');
        this.admin.next(false);

        this.router.navigate(['/']);
    }

    getUserProfile(userId: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}${EndpointEnum.PROFILE.replace('{userId}', userId.toString())}`);
    }

    getUser(userId: number): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.getJWT()}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        return this.http.get<any>(`${this.baseUrl}${EndpointEnum.USER.replace('{userId}', userId.toString())}`, {headers});
    }

    getJWT(): string | null {
        if (typeof window !== 'undefined' && window.sessionStorage) {
            return sessionStorage.getItem('token')
        } else {
            return null;
        }
    }

    getAuthorizationUrl(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}${EndpointEnum.LOGIN}`).pipe(
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

    postToken(code: string): Observable<TokenResponse> {
        if (typeof window !== 'undefined' && window.sessionStorage) {
            this.state = sessionStorage.getItem('state');
        }

        let body = new HttpParams()
            .set('code', code)
            .set('state', `${this.state}`);

        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        return this.http.post<TokenResponse>(`${this.baseUrl}${EndpointEnum.TOKEN}`, body.toString(), {headers});
    };

    handleCallback(code: string): void {
        this.postToken(code).subscribe(response => {
            const userId = response.user_id;
            const token = response.token;

            sessionStorage.setItem('token', token);

            this.getUser(userId).subscribe(userInfo => {
                sessionStorage.setItem('user', JSON.stringify(userInfo));
                this.loggedIn.next(true);
                this.avatarUrl.next(userInfo.profile.avatar_url);
                this.admin.next(userInfo.roles.some((role: any) => role.name === 'admin'));
                this.router.navigate(['/']);
            });
        });
    }
}
