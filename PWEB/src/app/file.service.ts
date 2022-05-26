import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';



export interface UserFile {
  filename : string;
  type : string;
}

export class ProjectInfo {
  selectedProjectId!: number;
}

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private _fileURL = "http://localhost:3000/api/files" //recupère les données depuis le serveur
  private _fileLoad = "http://localhost:3000"
  private _fileUpload = "http://localhost:3000/api/upload"
  private _fileDownload = "http://localhost:3000/api/download"
  private _getAllFilesProject = "http://localhost:3000/api/getAllFilesProject"

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${this.auth.getToken()}`,
      'Access-Control-Allow-Origin':'*' ,
   })
  }

  httpOptions2 = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `${this.auth.getToken()}`,
   })
  }

  httpOptionsToken = {
    headers: new HttpHeaders({ 
      'Authorization': `${this.auth.getToken()}`,
   })
  }

  getFile(project : ProjectInfo) {
    console.log(project);
    return this.http.post<any[]>(this._fileURL, project  ,this.httpOptionsToken);
  }

  createFile(file : UserFile) {
    return this.http.post<UserFile>(this._fileURL, file);
  }

  uploadFile(file: any):Observable<any>{
    const formData = new FormData();
    formData.append("file", file, file.name);
    return this.http.post(this._fileUpload, formData, this.httpOptions);
  }

  upload(formData:FormData):Observable<FormData>{
    return this.http.post<FormData>(this._fileUpload,formData, this.httpOptionsToken);
  }

  downloadFile(){
    console.log("ça marche");
    return this.http.post<any>(this._fileDownload,this.httpOptions2);
  }

  downloadMore(){
    return this.http.post<any>(this._fileDownload,this.httpOptions2);
  }
  /*getDown(){
    return this.http.get<any>(this._fileDownload,this.httpOptions2);
  }*/

  getAllFilesProject() {
    return this.http.get<any>(this._getAllFilesProject, this.httpOptions2);
  }

  

  constructor(private http : HttpClient, private auth: AuthService) { }
}
