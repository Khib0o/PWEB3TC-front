import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public _auth : AuthService) { }

  ngOnInit(): void {
  }

}
