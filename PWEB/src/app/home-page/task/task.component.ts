import { Component, OnInit } from '@angular/core';
import { TASKS } from './mock-tasks';



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks = TASKS;
  constructor() { }

  ngOnInit(): void {
  }


}
