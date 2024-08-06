import {CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {inject} from '@angular/core';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {AuthService} from './auth.service';

export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.isAdmin().pipe(
        take(1),
        map(isAdmin => {
            if (isAdmin) {
                return true;
            } else {
                router.navigate(['/']);
                return false;
            }
        })
    );
};