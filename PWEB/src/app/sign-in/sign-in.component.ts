import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  loginUserData = {
    email : '',
    password : ''
  }

  userInfo = {
    name: '',
    url : '',
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
    private _auth: AuthService,
    private _router: Router
    ) { }

  ngOnInit(): void {
    this.googleAuthSDK();
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
        localStorage.setItem('token', googleAuthUser.getAuthResponse().id_token)
        
        this.userInfo.name = profile.getName()
        this.userInfo.url = profile.getImageUrl()

        this._router.navigate(['/functionality/user-file'])
          .then(() => {
            window.location.reload();
        });
        
       /* Write Your Code Here */
    
      }, (error:any) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  getUserName(){
    return this.userInfo.name
  }

  getUserUrl(){
    return this.userInfo.url
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

  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe({
      next: (res : any) => { 
        console.log(res) 
      },
      error: (err : any) => {console.log(err)}
    })
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