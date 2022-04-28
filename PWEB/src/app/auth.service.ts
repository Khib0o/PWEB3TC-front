import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserInfo } from './models/user-info';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3333/api/register"
  private _loginUrl = "http://localhost:3000/api/login"

  constructor(
    private http: HttpClient,
    private _router: Router
    ) { }

  
  registerUser(user: any) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user: any) {
    console.log(user);
    return this.http.post<any>(this._loginUrl, user)
  }
  
  loggedIn() {
    return !!localStorage.getItem('token') //si il y'a token, return true, sinon return false
  }

  getToken() {
    return localStorage.getItem('token')
  }

  logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate(['/'])
  }
  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  registerGoogleAccount(userInfo : UserInfo): Observable<UserInfo> {
    return this.http.post<UserInfo>(this._registerUrl, userInfo, this.httpOptions)
  }
}
