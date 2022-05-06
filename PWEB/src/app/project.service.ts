import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Project } from './models/project';
import { Observable } from 'rxjs';
import { ProjectUserAssociation } from './models/project-user-association';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http : HttpClient, private auth: AuthService) { }
  
  private _getProjectByUser = "http://localhost:3000/api/getProjectbyUser";
  private _addUserToProject = "http://localhost:3000/api/addUserToProject";
  private _removeUserToProject = "http://localhost:3000/api/removeUserToProject";


  httpOptions = {
    headers: new HttpHeaders({ 
      'Authorization': `${this.auth.getToken()}`,
   })
  }

  getProjectbyUser() {
    return this.http.get<Project[]>(this._getProjectByUser, this.httpOptions);
  }

  addUserToProject(IdProject: ProjectUserAssociation):Observable<ProjectUserAssociation> {
    return this.http.post<ProjectUserAssociation>(this._addUserToProject, IdProject, this.httpOptions);
  }

  removeUserToProject(IdProject: ProjectUserAssociation):Observable<ProjectUserAssociation> {
    return this.http.post<ProjectUserAssociation>(this._removeUserToProject, IdProject, this.httpOptions);
  }

}
