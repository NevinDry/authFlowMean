import { Injectable } from '@angular/core';
import { User } from '../Models/User';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { HttpError } from '../Models/HttpError';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public User: User = null;
  constructor(private http: HttpClient) {
    this.init();
  }

  init(): void {
    if (this.isTokenExpired()) {
      this.logout();
    } else {
      this.User = this.getUserFromToken();
    }
  }


  register(user): Observable<Object> {
    return this.http.post(environment.apiUrl + "/users/register", user).pipe(
      map((response: any) => {
        this.setToken(response.token);
        this.User = this.getUserFromToken();
        return response;
      }),
      catchError((response) => {
        throw response.error.message;
      })
    );
  }

  login(user): Observable<Object> {
    return this.http.post(environment.apiUrl + "/users/login", user).pipe(
      map((response: any) => {
        this.setToken(response.token);
        this.User = this.getUserFromToken();
        return response;
      }),
      catchError((response) => {
        throw response.error.message;
      })
    );
  }

  setToken(token) {
    localStorage.setItem("token", token);
  }

  logout() {
      localStorage.removeItem('token');
      this.User = null;
  }

  getToken = function () {
    return localStorage['token'];
  };

  getUserFromToken() {
    return {
      name: jwt_decode(this.getToken()).name
    };
  }


  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }
}
