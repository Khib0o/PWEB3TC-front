import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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

  getFile() {
    console.log(this.http.get<any[]>(this._fileURL));
    return this.http.get<any[]>(this._fileURL);
  }

  createFile(file : UserFile) {
    return this.http.post<UserFile>(this._fileURL, file);
  }

  uploadFile(file :any){
    return this.http.get<any>(this._fileLoad, file).subscribe(data =>{file=data});
  }




  constructor(private http : HttpClient) { }
}
