import { Component, OnInit } from '@angular/core';
import { ACTIVITIES } from './mock-activities';
import { DEADLINES } from './mock-deadlines';

@Component({
  selector: 'app-content-mypage',
  templateUrl: './content-mypage.component.html',
  styleUrls: ['./content-mypage.component.css']
})
export class ContentMyPageComponent implements OnInit {
  dataSourceActivities  = ACTIVITIES;
  dataSourceDeadlines  = DEADLINES;
  displayedColumns: string[] = ['title', 'date'];

  

  

  constructor() { }

  ngOnInit(): void {
  }

}
