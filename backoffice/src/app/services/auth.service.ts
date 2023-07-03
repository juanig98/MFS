
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';
import { IUser } from '../models/interfaces/IUser';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly COOKIE_TOKEN = 'mfs_token'
  private user!: IUser;

  constructor(private http: HttpClient, private cookie: CookieService) { }

  /** Seteo de token en las cookies */
  public setToken(token: string) { this.cookie.set(this.COOKIE_TOKEN, token, 1, "/") }

  /** Obtención del token desde el las cookies */
  public getToken(): any { return this.cookie.get(this.COOKIE_TOKEN) }

  public getHttpHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`
      })
    }
  }

  public getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    })
  }

  /**
   * Realiza el logueo en el backend enviando las credenciales que provea el usuario
   *
   * @param Credentials
   */
  public login(credentials: LoginDTO): Observable<Token> {
    return this.http.post<Token>(`/auth`, credentials);
  }

  /**
   * Realiza el cierre de cesión
   *
   */
  public logout(): void {
    this.cookie.set(this.COOKIE_TOKEN, "", new Date(), "/")
  }

  /**
   * Consulta si el usuario está logueado en sistema
   *
   * @returns boolean
   */
  public isLogged(): Observable<boolean> {
    const subject = new Subject<boolean>();

    try {

      const token = this.getToken();

      // Si no hay token falla (retorna falso)
      if (!token) return new Observable(o => { o.next(false); o.complete(); });


      // Si el usuario está fuera del periodo de gracia se valida con el token
      this.http.post<any>(`/auth/validate/`, {}, this.getHttpHeaders()).subscribe(
        response => { subject.next(true); }, // Si es válido
        error => { subject.next(false); } // Si no es válido
      );

      return subject.asObservable();
    } catch (error) {
      return new Observable(o => { o.next(false); o.complete(); });
    }
  }

}

export interface LoginDTO {
  username: string;
  password: string;
}

export interface Token {
  token: string;
}
