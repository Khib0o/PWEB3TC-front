import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  userEmail!: string;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmitForm(form: NgForm) {
    console.log(form.value);
  }

}
