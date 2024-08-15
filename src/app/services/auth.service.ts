import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {EndpointEnum} from "../enums/endpoint.enum";
import {map} from "rxjs/operators";
import {HttpClient, HttpParams} from "@angular/common/http";
import {TokenResponse} from "../interfaces";
import {environment} from "../../environments/environment";
import {UserService} from "./user.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl: string = environment.baseUrl;
    private state: string | null = null;

    private loggedIn = new BehaviorSubject<boolean>(false);
    private avatarUrl = new BehaviorSubject<string>('./assets/icons/person.svg');
    private admin = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient, private router: Router, private user: UserService) {
        if (typeof window !== 'undefined' && window.sessionStorage) {
            const osuUser = sessionStorage.getItem('osuUser');

            if (osuUser) {
                this.loggedIn.next(true);
                this.avatarUrl.next(JSON.parse(osuUser).avatar_url);
            }

            const user = sessionStorage.getItem('user');
            if (user) {
                const userJson = JSON.parse(user);

                userJson.roles.forEach((role: any) => {
                    if (role.name === 'admin') {
                        this.admin.next(true);
                    }
                })
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

        this.router.navigate(['/']);
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

        return this.http.post<TokenResponse>(`${this.baseUrl}${EndpointEnum.TOKEN}`, body.toString());
    };

    handleCallback(code: string): void {
        this.postToken(code).subscribe(response => {
            const userId = response.user_id;
            const token = response.token;
            
            sessionStorage.setItem('token', token);

            this.user.getUserOsuProfile(userId).subscribe(userInfo => {
                sessionStorage.setItem('osuUser', JSON.stringify(userInfo));
                this.loggedIn.next(true);
                this.avatarUrl.next(userInfo.avatar_url);
                this.router.navigate(['/']);
            });

            this.user.getUser(userId).subscribe(userInfo => {
                sessionStorage.setItem('user', JSON.stringify(userInfo));
            });
        });
    }
}
