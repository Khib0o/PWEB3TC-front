import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

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

  

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
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