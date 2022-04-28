import { Component, OnInit } from '@angular/core';
import { TEAM } from './mock-team';
import { DEADLINES } from './mock-deadlines';

@Component({
  selector: 'app-content-mypage',
  templateUrl: './content-mypage.component.html',
  styleUrls: ['./content-mypage.component.css']
})
export class ContentMyPageComponent implements OnInit {
  teamData  = TEAM;
  dataSourceDeadlines  = DEADLINES;
  displayedColumns: string[] = ['code', 'name'];

  

  

  constructor() { }

  ngOnInit(): void {
  }

}
