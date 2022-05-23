import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserInfo } from '../models/user-info';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {
  endAnimation : boolean = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  loginUserData = {
    email : '',
    password : ''
  }

  userInfo : UserInfo = {
    "token": "",
    "id": 0,
    "name": "",
    "url": "",
    "email": ""
  }


  auth2: any;
  @ViewChild('loginRef', {static: true }) loginElement!: ElementRef;
  /*
  registerUserData = {
    email: '',
    password: ''
  }
  */
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'champ obligatoire';
    }
    return this.email.hasError('email') ? 'Adresse mail non valide' : '';
  }

  

  constructor(
    private http: HttpClient,
    private _auth: AuthService,
    private _router: Router
    ) { }

  ngOnInit(): void {
    localStorage.clear();
    this.googleAuthSDK();
    this.display();
  }

  display() {
    setTimeout(() => this.endAnimation=true, 1200);
  }



  callLoginButton() {
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleAuthUser:any) => {
     
        let profile = googleAuthUser.getBasicProfile();
        console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

        localStorage.setItem('token', profile.getId()) //stockage du token
        
        this.userInfo.token = profile.getId();
        this.userInfo.id = profile.getId();
        this.userInfo.name = profile.getName();
        this.userInfo.url = profile.getImageUrl();
        this.userInfo.email = profile.getEmail();

        this.registerGoogleAccount();



        this._router.navigate(['/functionality'])
          .then(() => {
            this.refresh()
        });
        
       /* Write Your Code Here */
    
      }, (error:any) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }
  
  /**
   * Write code on Method
   *
   * @return response()
   */
  googleAuthSDK() {
     
    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: '54005535557-ebru8k3h57c5qd8hp1lrqopkajvuh670.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.callLoginButton();
      });
    }
     
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement('script'); 
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
   
  }

  registerGoogleAccount() {
    this._auth.registerGoogleAccount(this.userInfo).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

  /*
  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe({
      next: (res : any) => { 
        console.log(res) 
      },
      error: (err : any) => {console.log(err)}
    })
  }
  */

  
  testBD() {

    console.log("le bouton est push")
    this.http.get('http://localhost:3333/api/users', {observe: 'response',responseType: 'json'})
    .subscribe(data => console.log(data))

  }

  refresh(): void {
    setTimeout(function() {
      window.location.reload();
    }, 1500);
    
  }
  
  /*
  registerUser(){
    this._auth.registerUser(this.registerUserData).subscribe({
      next: (res) => { 
        console.log(res) 
      },
      error: (err) => {console.log(err)}
    })
  }
  */

}