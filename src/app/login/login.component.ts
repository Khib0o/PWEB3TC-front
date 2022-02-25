import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  loginUserData = {
    email : '',
    password : ''
  }

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
  }


  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe({
      next: (res) => { 
        console.log(res) 
        localStorage.setItem('token', res.token)
        this._router.navigate(['/folders'])
      },
      error: (err) => {console.log(err)}
    })
  }

}
