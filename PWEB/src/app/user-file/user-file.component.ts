import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FileService, ProjectInfo, UserFile } from '../file.service';
import { HttpClient} from '@angular/common/http';
import { debounceTime, map } from 'rxjs';
import { AuthService } from '../auth.service';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-user-file',
  templateUrl: './user-file.component.html',
  styleUrls: ['./user-file.component.css']
})

export class UserFileComponent implements OnChanges {
  @Input() selectedProjectId: number = 0;


  uploadedFiles!: File;
  FileUpload = {
    fieldname: '',
    originalname: '',
    encoding :'',
    mimetype:'',
    destination:'',
    filename:'',
    path:'',
    size:''
  }

  constructor(private fileService: FileService, private http : HttpClient, private _auth: AuthService) {

  }

  currentProjectInfo : ProjectInfo = {
    "selectedProjectId" : 0
  }



  sharedFiles!: any;
  idString : string = "";
  

  

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['selectedProjectId'].currentValue);
    this.currentProjectInfo.selectedProjectId = changes['selectedProjectId'].currentValue;
    this.fileService.getFile(this.currentProjectInfo).pipe(

    ).subscribe(
      res => { this.sharedFiles = res },
      err => console.log(err)
    );

    console.log("SharedFiles: ", this.sharedFiles)
  }

  func(name:any){	
    window.location.href = "http://localhost:3000/api/download/" + name;
  }


  fileChange(element:any) {
    this.uploadedFiles = element.target.files[0];
    console.log(this.uploadedFiles);
  }



  upload() {
    console.log(this.uploadedFiles.name);
    var formData = new FormData();
    formData.append('file',this.uploadedFiles);
    formData.append('name',this.uploadedFiles.name);
    this.idString = this.currentProjectInfo.selectedProjectId.toString(); 
    formData.append('IdProjects', this.idString);
    console.log(formData);

    this.fileService.upload(formData).pipe(debounceTime(3000)).subscribe(
      res=>console.log(res),
      err=>console.log("erreur à fix"),
      //()=> this.refresh

    ) 
}

  download(){
    console.log('working');
    this.fileService.downloadFile();
  }





delete(element:any){
    for (var i = 0; i < element.length; i++)
    {
      var fileid=element[i].value.id;
      var idobj={
        "fileid": fileid
      };
      this.http.post('/api/deletefiles', idobj)
      .subscribe((response) => {
          console.log('response received is ', response);
          location.reload();
      })
    }  

  }

  show(element:any){
    console.dir(element[0].value);
  }

  
  refresh(): void {
    setTimeout(function() {
      //window.location.reload();
    }, 500);
    
}


}
