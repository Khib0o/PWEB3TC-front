import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  
  constructor(
    private _auth: AuthService,
    @Inject(Router) private _router: Router
  ) { }

  registerUser(){
    this._auth.registerUser(this.registerUserData).subscribe({
      next: (res) => { 
        console.log(res) 
        localStorage.setItem('token', res.token)
        this._router.navigate(['/'])
      },
      error: (err) => {console.log(err)}
    })
  }

  ngOnInit(): void {
  }

}
