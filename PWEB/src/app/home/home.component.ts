import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { ProjectUserAssociation } from '../models/project-user-association';
import { ProjectService } from '../project.service';
import { AuthService } from '../auth.service';
import { NewProject } from '../models/NewProject';
import { UserInfo } from '../models/user-info';

export interface DialogData {
  email: string;
  IdProjects: number;
}

export interface DialogData1 {
  ProjectName: string;
  Users: string;
}

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
  selectedProjectId: Project = {
    "IdOwner": 0,
    "IdProjects": 0,
    "Name":"Espace Personnel"
  }

  defaultSelectedProjectId: Project = {
    "IdOwner": 0,
    "IdProjects": 0,
    "Name":"Espace Personnel"
  }

  isProject!: boolean;
  
  projectUser: ProjectUserAssociation = {
    "email": "",
    "IdProjects": 0
  }

  test: NewProject = {
    "name": "",
    "users": "",
    "tokenOwner": ""
  };

  selectedProjectIdJson: ProjectUserAssociation = {
    "email": "",
    "IdProjects": 0
  }

  constructor(
    private _projectService: ProjectService,
    public dialog: MatDialog,
    private _auth: AuthService
  ){}

  myProfile!: any;

  onChange(event : any) {
    console.log("onChange SelectProject: ",event.Name);
    localStorage.setItem('CurrentProjectName', event.Name);
  }


  openDialogAdd() {
    const dialogRef = this.dialog.open(AddUserDialog, {
      width: '250px',
      data: {email: this.email},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      this.projectUser.email = result;
      this.projectUser.IdProjects = this.selectedProjectId.IdProjects;
      console.log("Add User to project: ",this.projectUser)
      this.onAddUserButton(this.projectUser);
    });
  }

  openDialogProjectCreate() {

    const dialogRef = this.dialog.open(CreateProjectDialog, {
      width: '250px',
      data :{name: this.email}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result:`+result);

      /*
      this.test.name = result.ProjectName;
      this.test.users = result.Users;
      this.test.tokenOwner = localStorage.getItem('token');

      this._projectService.createNewProject(this.test).subscribe(res =>console.log(res), err => console.log(err));
      */
      this._auth.getUserInfo().subscribe(
        res => {
          console.log(res[0].email);
          //this.onAddUserButton({"email": res[0].email , "IdProjects": this.selectedProjectId})
          this.test.name = result.ProjectName;
          this.test.users = result.Users +","+res[0].email;
          this.test.tokenOwner = localStorage.getItem('token');

          this._projectService.createNewProject(this.test).subscribe(res =>console.log("res of http request CreateProject: ",res), err => console.log(err));
          this._projectService.getLatestProjectByUser().subscribe(
            res => {
              console.log("Latest Project: ",res[0]);
              let newIdProject = "" + res[0].IdProjects.toString()
              localStorage.setItem('idCurrentProject', newIdProject);
              
              let newNameProject = ""+ res[0].Name;
              localStorage.setItem('CurrentProjectName', newNameProject);
            },
            err => console.log(err)
          );
        },
        err => console.log(err) 
      );
      
      this.refresh();
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
      this.projectUser.IdProjects = this.selectedProjectId.IdProjects
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
    console.log("this.selectedProjectId: ", this.selectedProjectId);
    if ( Number(localStorage.getItem('idCurrentProject')) == null) {
      this.selectedProjectId.IdProjects = 0;
      this.selectedProjectId.Name = "Espace Personnel";
    } else {
      this.selectedProjectId.IdProjects = Number(localStorage.getItem('idCurrentProject'));
      this.selectedProjectId.Name = ""+localStorage.getItem('CurrentProjectName');
    }


    

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

  onGetMembersProjectButton(){
    this.selectedProjectIdJson.IdProjects = this.selectedProjectId.IdProjects;
    this._projectService.getMembersOfProject( this.selectedProjectIdJson).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

  refresh(): void {
    setTimeout(function() {
      window.location.reload();
    }, 1500);
    
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
  selector: 'create-project-dialog',
  templateUrl: 'CreateProjectDialog.html',
})
export class CreateProjectDialog {
  constructor(
    public dialogRef: MatDialogRef<CreateProjectDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData1,
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
