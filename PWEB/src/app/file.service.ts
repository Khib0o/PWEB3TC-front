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
  //private _fileURL = "http://localhost:3000/api/file" //recupère les données depuis le serveur
  private _fileURL = "assets/file.json" //récupère les données depuis assets/file.json

  getFile() {
    return this.http.get<UserFile[]>(this._fileURL);
  }

  constructor(private http : HttpClient) { }
}
