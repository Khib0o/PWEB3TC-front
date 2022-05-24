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

  private _registerUrl = "http://localhost:3000/api/register"
  private _loginUrl = "http://localhost:3000/api/login"
  private _getUserInfoUrl = "http://localhost:3000/api/getUser"


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
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  httpOptionsToken = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization':`${this.getToken()}`,
    })
  }

  registerGoogleAccount(userInfo : UserInfo): Observable<UserInfo> {
    console.log(userInfo);
    return this.http.post<UserInfo>(this._registerUrl, userInfo, this.httpOptions)
  }

  //Envoie une requete get en donnant le token
  getUserInfo() {
    console.log("Mon token: ",this.getToken());
    return this.http.get<any>(this._getUserInfoUrl, this.httpOptionsToken);
  }


}
