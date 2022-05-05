import { Component, OnInit } from '@angular/core';
import { FileService, UserFile } from '../file.service';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-user-file',
  templateUrl: './user-file.component.html',
  styleUrls: ['./user-file.component.css']
})

export class UserFileComponent implements OnInit {
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
    this.uploadedFiles = element.target.files[0];
    console.log(this.uploadedFiles);
  }



  upload() {
    console.log(this.uploadedFiles.name);
    var formData = new FormData();
    formData.append('file',this.uploadedFiles);
    formData.append('name',this.uploadedFiles.name);
    console.log(this.uploadedFiles);

    this.fileService.upload(formData).subscribe(
      res=>console.log(res),
      err=>console.log(err)
    ) 
      



}

}
