import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserInfo } from './models/user-info';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { contactInfo } from './contact/contact.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register"
  private _loginUrl = "http://localhost:3000/api/login"
  private _getUserInfoUrl = "http://localhost:3000/api/getUser"
  private _sendContactInfo = "http://localhost:3000/api/sendContactInfo"

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

  //Envoyer le formulaire de contact à la base de données
  sendContactInfo(formData: contactInfo) {
    console.log(formData);
    return this.http.post<contactInfo> (this._sendContactInfo, formData);
  }
}
