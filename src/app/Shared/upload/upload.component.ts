import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent  {

  progress!: number;
  message!: string;

  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient) {}

  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }

    let filesToUpload: File[] = files;
    const formData = new FormData();

    Array.from(filesToUpload).map((file, index) => {
      return formData.append('file' + index, file, file.name);
    });

    this.http.post('https://localhost:5001/api/upload', formData, { reportProgress: true, observe: 'events', responseType: 'text' })
      .subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            console.log('Response received from server:', event.body); // Log the response
            // Emit event with response text
            this.onUploadFinished.emit(event.body);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          // Handle error
        }
      });
  }


}
