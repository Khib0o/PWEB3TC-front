import { Component, OnInit } from '@angular/core';
import { TEAM } from './mock-team';
import { DEADLINES } from './mock-deadlines';
import { UserInfo } from 'src/app/models/user-info';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-content-mypage',
  templateUrl: './content-mypage.component.html',
  styleUrls: ['./content-mypage.component.css']
})
export class ContentMyPageComponent implements OnInit {
  teamData  = TEAM;
  dataSourceDeadlines  = DEADLINES;
  displayedColumns: string[] = ['code', 'name'];

  userInfo$!: Observable<UserInfo[]>;

  

  constructor(private _authService : AuthService) { }

  ngOnInit(): void {
    /* Pour afficher le res
    this._authService.getUserInfo().subscribe(
      res => console.log(res),
      err => console.log(err)
    );
    */
    
    this.userInfo$ = this._authService.getUserInfo()
  }

}
