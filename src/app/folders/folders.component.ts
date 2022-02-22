import { Component, OnInit } from '@angular/core';
import { FILES } from 'src/mock-folders';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit {
  files = FILES;
  constructor() { }

  ngOnInit(): void {
  }

}
