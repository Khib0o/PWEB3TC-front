import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  registerUserData = {
    email: '',
    password: ''
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'champ obligatoire';
    }
    return this.email.hasError('email') ? 'Adresse mail non valide' : '';
  }

  registerUser(){
    this._auth.registerUser(this.registerUserData).subscribe({
      next(res) { console.log(res) },
      error(err) { console.log(err) }
    })
  }
  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  }

}
