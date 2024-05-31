import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import { logout } from '../store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'http://localhost:8080/login';


  private _user: any;

  constructor(
    private store: Store<{auth: any}>,
    private http: HttpClient) {

    this.store.select('auth').subscribe(state => {
      this._user = state;
    })
  }

  loginUser({ username, password }: any): Observable<any> {
    return this.http.post<any>(this.url, { username, password });
  }

  set user(user: any) {
    sessionStorage.setItem('login', JSON.stringify(user));
  }

  get user() {
    return this._user;
  }

  set token(token: string) {
    sessionStorage.setItem('token', token);
  }

  get token() {
    return sessionStorage.getItem('token')!;
  }

  getPayload(token: string) {
    if (token != null) {
      return JSON.parse(atob(token.split(".")[1]));
    }
    return null;
  }

  isAdmin() {
    return this.user.isAdmin;
  }

  isDoctor() {
    return this.user.isDoctor();
  }

  isPatient() {
    return this.user.isPatient();
  }

  authenticated() {
    return this.user.isAuth;
  }

  logout() {
    this.store.dispatch(logout());
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('token');
  }

}
