import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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

  

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe({
      next(res) {console.log(res)},
      error(err) {console.log(err)}
    })
  }

}
