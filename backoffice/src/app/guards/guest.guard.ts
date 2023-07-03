import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.authService.getToken();
    if (token) {
      return this.authService.isLogged().pipe(
        map((response) => {
          if (response) {
            this.router.navigate(['/app']);
            return false;
          } else {
            return true;
          }
        }), catchError((err: Response) => {
          return throwError(err.statusText);
        }));

    } else {
      return true;
    }
  }

}
