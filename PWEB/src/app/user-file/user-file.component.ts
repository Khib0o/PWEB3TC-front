import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service';

@Component({
  selector: 'app-user-file',
  templateUrl: './user-file.component.html',
  styleUrls: ['./user-file.component.css']
})
export class UserFileComponent implements OnInit {

  constructor(private fileService: FileService) { }

  sharedFiles = this.fileService.getFile();

  ngOnInit(): void {
  }

}
