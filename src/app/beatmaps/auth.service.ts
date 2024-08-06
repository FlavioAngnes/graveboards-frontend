import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ServicesService} from './services.service';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loggedIn = new BehaviorSubject<boolean>(false);
    private avatarUrl = new BehaviorSubject<string>('./assets/icons/person.svg');
    private admin = new BehaviorSubject<boolean>(false);

    constructor(private servicesService: ServicesService, private router: Router) {
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
        this.servicesService.getAuthorizationUrl().subscribe(response => {
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

    handleCallback(code: string): void {
        this.servicesService.postToken(code).subscribe(response => {
            const userId = response.user_id;

            this.servicesService.getUserOsuProfile(userId).subscribe(userInfo => {
                sessionStorage.setItem('osuUser', JSON.stringify(userInfo));
                this.loggedIn.next(true);
                this.avatarUrl.next(userInfo.avatar_url);
                this.router.navigate(['/']);
            });

            this.servicesService.getUser(userId).subscribe(userInfo => {
                sessionStorage.setItem('user', JSON.stringify(userInfo));
            });
        });
    }
}
