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
  _fileUrl = '/assets/file.json'

  getFile() {
    return this.http.get<UserFile[]>(this._fileUrl);
  }

  constructor(private http : HttpClient) { }
}
