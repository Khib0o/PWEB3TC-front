import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { ProjectUserAssociation } from '../models/project-user-association';
import { ProjectService } from '../project.service';

export interface DialogData {
  email: string;
  IdProjects: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  email!: string;
  IdProjects!: number;
  selectedProjectId!: number;
  
  projectUser: ProjectUserAssociation = {
    "email": "",
    "IdProjects": 0
  }

  constructor(
    private _projectService: ProjectService,
    public dialog: MatDialog
  ){}

  openDialogAdd() {
    const dialogRef = this.dialog.open(AddUserDialog, {
      width: '250px',
      data: {email: this.email},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      this.projectUser.email = result;
      this.projectUser.IdProjects = this.selectedProjectId
      console.log("Add User to project: ",this.projectUser)
      this.onAddUserButton(this.projectUser);
    });
  }

  openDialogRemove() {
    const dialogRef = this.dialog.open(RemoveUserDialog, {
      width: '250px',
      data: {email: this.email},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      this.projectUser.email = result;
      this.projectUser.IdProjects = this.selectedProjectId
      console.log("Add User to project: ",this.projectUser)
      this.onRemoveUserButton(this.projectUser);
    });
  }
  

  


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

  onAddUserButton(projectUser : ProjectUserAssociation){
    this._projectService.addUserToProject(projectUser).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

  onRemoveUserButton(projectUser : ProjectUserAssociation){
    this._projectService.removeUserToProject(projectUser).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }


}
@Component({
  selector: 'add-user-dialog',
  templateUrl: 'addUserDialog.html',
})
export class AddUserDialog {
  constructor(
    public dialogRef: MatDialogRef<AddUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'remove-user-dialog',
  templateUrl: 'removeUserDialog.html',
})
export class RemoveUserDialog {
  constructor(
    public dialogRef: MatDialogRef<RemoveUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
