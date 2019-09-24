import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpEventType} from '@angular/common/http';
import {map} from 'rxjs/operators'
import * as moment from 'moment';

const uploadURL = `http://localhost:3000`;
//const uploadURL = `http://104.197.166.46:3000`;

@Injectable({providedIn:'root'})
export class FileTriggerService{


    constructor(private http:HttpClient){}

    downloadFile(){
        var body = {filename:"asas"};
        let finalURL = uploadURL+`/download`;
        return this.http.post(finalURL,body,{
            responseType : 'blob',
            headers:new HttpHeaders().append('Content-Type','application/json')
        })
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

   getFileName(fileType:string) : string {
    console.log(fileType);
    let fileName = "Demo_"+moment().format("MMMDoYY_hmmss");
     if(fileType === 'text/csv'){
      fileName=fileName+".csv"
    } 
    return fileName;
  }

 

}