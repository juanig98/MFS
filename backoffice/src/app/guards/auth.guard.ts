import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }
  
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.authService.getToken(); // Obtener el token de la cookie

    if (token) {
      return true; // El usuario tiene un token, permitir el acceso a la ruta
    } else {
      // El usuario no tiene un token, redirigir a la pantalla de inicio de sesión
      return this.router.parseUrl('/login');
    }
  }

}
