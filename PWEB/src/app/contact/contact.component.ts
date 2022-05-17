import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export class contactInfo {
  email!: string
  title!: string
  description!: string
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  ourForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.ourForm = this.formBuilder.group({
      email : [null, Validators.required],
      title : [null, Validators.required],
      description : [null, Validators.required]
    });
  }


  myContactInfo: contactInfo = {
    "email": "",
    "title": "",
    "description": ""
  };
  

  onSubmitForm(): void {
    console.log(this.myContactInfo);
    this._snackBar.open("Message envoyé", "Ok");
    this.auth.sendContactInfo(this.myContactInfo).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }


}
