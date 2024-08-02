import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServicesService } from './services.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private avatarUrl = new BehaviorSubject<string>('./assets/icons/person.svg');

  constructor(private servicesService: ServicesService, private router: Router) {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const user = sessionStorage.getItem('user');

      if (user) {
        this.loggedIn.next(true);
        this.avatarUrl.next(JSON.parse(user).avatar_url);
      }
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getAvatarUrl(): Observable<string> {
    return this.avatarUrl.asObservable();
  }

  login(): void {
    const authorizationUrl = this.servicesService.getAuthorizationUrl().subscribe(response => {
        const authorizationUrl = response.authorization_url;
        window.location.href = authorizationUrl;
    });
  }

  logout(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.loggedIn.next(false);
    this.avatarUrl.next('./assets/icons/person.svg');
  }

  handleCallback(code: string): void {
    this.servicesService.postToken(code).subscribe(response => {
      const userId = response.user_id;

      this.servicesService.getUserProfile(userId).subscribe(userInfo => {
        sessionStorage.setItem('user', JSON.stringify(userInfo));
        this.loggedIn.next(true);
        this.avatarUrl.next(userInfo.avatar_url);
        this.router.navigate(['/']);
      });
    });
  }
}
