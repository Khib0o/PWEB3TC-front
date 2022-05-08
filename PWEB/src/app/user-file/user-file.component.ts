import { Component, OnInit } from '@angular/core';
import { FileService, UserFile } from '../file.service';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-user-file',
  templateUrl: './user-file.component.html',
  styleUrls: ['./user-file.component.css']
})

export class UserFileComponent implements OnInit {
  uploadedFiles: Array<File> = [];
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

  constructor(private fileService: FileService, private http : HttpClient) {

  }

  sharedFiles = this.fileService.getFile().pipe(
    
  );

  FileData = {
    filename: '',
    type: ''
  }

  ngOnInit(): void {
    /*
    this.http.post<any>('http://http://localhost:3333', { title: 'Angular POST Request Example' }).subscribe(data => {
        this.FileUpload
    })
    */
  }

  createFile() {
    this.fileService.createFile(this.FileData).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {console.log(err)}
    })
  }

  fileChange(element:any) {
    this.uploadedFiles = element.target.files;
    console.log(this.uploadedFiles);
  }

  upload() {
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
        console.log(formData);
      }
      
    this.http.post('/api/upload', formData)
    .subscribe((response) => {
        console.log('response received is ', response);
    })
}
delete(element:any){
    for (var i = 0; i < element.length; i++)
    {
      var fileid=element[i].value.IdFile;
      var idobj={
        fileid: fileid
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

}
