import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Project } from './models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http : HttpClient, private auth: AuthService) { }
  
  private _getProjectByUser = "http://localhost:3000/api/getProjectbyUser"

  httpOptions = {
    headers: new HttpHeaders({ 
      'Authorization': `${this.auth.getToken()}`,
   })
  }

  getProjectbyUser() {
    return this.http.get<Project[]>(this._getProjectByUser, this.httpOptions);
  }

}
