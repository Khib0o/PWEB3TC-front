import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FileService, ProjectInfo, UserFile } from '../file.service';
import { HttpClient} from '@angular/common/http';
import { debounceTime, map, Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-view-all-files',
  templateUrl: './view-all-files.component.html',
  styleUrls: ['./view-all-files.component.css']
})

export class ViewAllFilesComponent implements OnInit {

  constructor(private fileService: FileService, private http : HttpClient, private _auth: AuthService) {

  }


  allFiles$!: Observable<any[]>;
  myFiles$!: Observable<any[]>;



  

  getCurrentId() : number {
    let tmp = 0;
    tmp = Number(localStorage.getItem('idCurrentProject')!);
    return tmp;
  }

  

  ngOnInit(): void {
    this.allFiles$ = this.fileService.getAllFilesProject();
    this.myFiles$ = this.fileService.getFile({"selectedProjectId": 0});
  }


  func(name:any){	
    window.location.href = "http://localhost:3000/api/download/" + name;
  }

  downloadMore(element:any){
    for (var i = 0; i < element.length; i++){
      window.location.href = "http://localhost:3000/api/download/" + element[i].value.name;
      this.refresh;
    }
  }





 


  download(){
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
      window.location.reload();
    }, 1500);
    
  }


}

