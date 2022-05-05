import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private _projectService: ProjectService) { }
  selectedProject!: string;
  /*
  projets = [
    {name: "Projet 1"},
    {name: "Projet 2"},
    {name: "Projet 3"},
  ]
  */

  projets$!: Observable<Project[]>;

  ngOnInit(): void {
    this.projets$ = this._projectService.getProjectbyUser();
  }


}
