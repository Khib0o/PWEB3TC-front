import { Component, OnInit } from '@angular/core';
import { FileService, UserFile } from '../file.service';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-user-file',
  templateUrl: './user-file.component.html',
  styleUrls: ['./user-file.component.css']
})

export class UserFileComponent implements OnInit {
  
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
    /*
    this.http.post('http://localhost:3333/upload', this.FileUpload).toPromise().then(data => {console.log(data)})
    */
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

  /*
  uploadFile(file :any){
    this.fileService.uploadFile(file);
    console.log(file);
  }*/

  //Test
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file!: File // Variable to store file

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.fileService.uploadFile(this.file).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          this.shortLink = event.link;
          this.loading = false;
        }
      }
    );
  }

}
