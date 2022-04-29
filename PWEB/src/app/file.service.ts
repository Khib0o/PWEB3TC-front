import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


export interface UserFile {
  filename : string;
  type : string;
}

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private _fileURL = "http://localhost:3333/api/files" //recupère les données depuis le serveur
  private _fileLoad = "http://http://localhost:3333"
  private _fileUpload = "http://http://localhost:3333/upload"

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth.getToken()}`,
   })
  }

  getFile() {
    console.log(this.http.get<any[]>(this._fileURL));
    return this.http.get<any[]>(this._fileURL);
  }

  createFile(file : UserFile) {
    return this.http.post<UserFile>(this._fileURL, file);
  }

  uploadFile(file: any):Observable<any>{
    const formData = new FormData();
    formData.append("file", file, file.name);
    return this.http.post(this._fileUpload, formData, this.httpOptions);
  }





  constructor(private http : HttpClient, private auth: AuthService) { }
}
