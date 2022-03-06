import { Component, OnInit } from '@angular/core';
import { ACTIVITIES } from './mock-activities';
import { DEADLINES } from './mock-deadlines';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css']
})
export class ContentPageComponent implements OnInit {
  dataSourceActivities  = ACTIVITIES;
  dataSourceDeadlines  = DEADLINES;
  displayedColumns: string[] = ['title', 'date'];

  

  

  constructor() { }

  ngOnInit(): void {
  }

}
