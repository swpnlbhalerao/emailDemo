import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpEventType} from '@angular/common/http';
import {map} from 'rxjs/operators'

const uploadURL = `http://localhost:3000`;
@Injectable({providedIn:'root'})
export class FileTriggerService{


    constructor(private http:HttpClient){}

    downloadFile(){
        var body = {filename:"asas"};

        return this.http.post('http://localhost:4000/user/download',body,{
            responseType : 'blob',
            headers:new HttpHeaders().append('Content-Type','application/json')
        });
}
    
public submitData(data) {
    let finalURL = uploadURL+`/upload`;
    console.log(finalURL);
    console.log(data);
    return this.http.post<any>(finalURL, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', uploadProgress: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }

 

}