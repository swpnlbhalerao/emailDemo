import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileTriggerService } from './FileTriggerService';
import { getFileNameFromResponseContentDisposition,saveAs } from 'file-saver';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit, OnDestroy {

  /*  uploader:FileUploader = new FileUploader({url:uri});

    attachmentList:any = []; */
  selectedFiles: File[] = [];
  disableCancel: boolean = false;
  selectedfile: File;
  uploadResponse = { status: '', message: '', filePath: '', uploadProgress: '' };
  error: string;
  disableBtns: boolean = false;
  resetBtn: boolean = false;
  isLoading : boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(private fileService: FileTriggerService) {


  }

  ngOnInit() {

  }
 
  onSubmit(triggerEmailForm: NgForm) {
    this.isLoading =true; 
    if(!triggerEmailForm.valid){
        return ;
      }
    this.disableCancel = true;
    this.disableBtns = true;
    this.error = ''
    let formData = new FormData();
    // formData.append('file', this.selectedfile, this.selectedfile.name);

      this.selectedFiles.forEach((file) => {
      formData.append("empDetails", file, file.name)
    }) 
    //formData.append('files', this.selectedFiles);
    formData.append('subject', triggerEmailForm.value.subject)
    formData.append('emailBody', triggerEmailForm.value.emailBody)
    console.log(formData);

    this.subscriptions.add(this.fileService.submitData(formData).subscribe(
      (res) => {
        console.log(res);
        this.uploadResponse = res
        if(this.uploadResponse.status === 'success')
        this.isLoading=false; 
      },
      (err) => {
        console.log(err);
        this.error = err
        this.isLoading=false;
      }
    ));
  }
  removeUploadFile(index: number, triggerForm: NgForm) {
    this.selectedFiles.splice(index, 1);
    if (this.selectedFiles.length == 0) {
      triggerForm.controls['fileUpload'].reset();
    }
  }


  onFileChange(event, triggerForm: NgForm) {
    this.error = '';
    this.selectedFiles = [];
    console.log(event.target.files[0].type);
    for (let i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i].type == 'text/csv') {
        this.selectedFiles.push(event.target.files[i]);
      } else {
        triggerForm.controls['fileUpload'].reset();
        this.error = 'please upload only csv file'
        break;
      }


    }
  }


  download() {
    this.isLoading=true;
    this.error = ''
    console.log("download call")
    this.resetBtn = true;

    this.subscriptions.add(this.fileService.downloadFile()
      .subscribe(
        data =>{
        //  let fileName=getFileNameFromResponseContentDisposition(data);
          console.log(data);
          saveAs(data,this.fileService.getFileName(data.type)),
          this.isLoading=false;
        },
        error => {
          this.error = error;
          this.isLoading=false;
        }
      ));
  }

  resetForm(triggerEmailForm: NgForm) {
    this.isLoading=false;
    this.resetMessage();
    this.resetUploadResponse();
    this.disableCancel = false;
    this.disableBtns = false;

    triggerEmailForm.resetForm();
  }

  resetMessage() {
    this.error = ''
    this.selectedFiles = [];
  }

  resetUploadResponse() {
    this.uploadResponse = { status: '', message: '', filePath: '', uploadProgress: '' };

  }


  ngOnDestroy(): void {
    // cancel all subscriptions to avoid memory leaks
    this.subscriptions.unsubscribe();
  }

}