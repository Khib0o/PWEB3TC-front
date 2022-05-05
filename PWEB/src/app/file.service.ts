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
  private _fileURL = "http://localhost:3000/api/files" //recupère les données depuis le serveur
  private _fileLoad = "http://localhost:3000"
  private _fileUpload = "http://localhost:3000/api/upload"

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${this.auth.getToken()}`,
      'Access-Control-Allow-Origin':'*' ,
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

  upload(formData:FormData):Observable<FormData>{
    return this.http.post<FormData>(this._fileUpload,formData);
  }

  





  constructor(private http : HttpClient, private auth: AuthService) { }
}
