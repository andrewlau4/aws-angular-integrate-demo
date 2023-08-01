import { Component } from '@angular/core';

import { AwsService } from '../../services/aws.service';

type UploadFileInfo = {
  fileName: string,
  progress: number,
  done?: boolean,
  error?: any
};

@Component({
  selector: 'app-s3upload',
  templateUrl: './s3upload.component.html',
  styleUrls: ['./s3upload.component.scss']
})
export class S3uploadComponent {

  readonly invalidCssClass = "turn-red";
  readonly validCssClass = "turn-green";

  uploadFileInfoArray: UploadFileInfo[] = [];

  readonly checkFileTypesValidBinded = this.checkFileTypesValid.bind(this);
  
  readonly verifyFileItems = (items: any): boolean => {
    console.log(`items: ${JSON.stringify(items)}`)
    for (const i of items) {
      if (!( i && i.type && (i.type.startsWith('image') || i.type.startsWith('img')) )) {
        console.log(`item ${i} is not image`);
        return false;
      }
    }
    console.log("all items are images")
    return true;
  }

  constructor(private _awsService: AwsService) {}

  fileDropped(files: any) {
    this.uploadFileInfoArray = [];

    if (!files || files.length == 0) {
      return;
    }

    if (!this.verifyFileItems(files)) {
      //show error message
      return;
    }

    let index = 0;
    for (const f of files) {
      let thisIndex = index;
      let thisUploadFileInfoArray = this.uploadFileInfoArray;

      thisUploadFileInfoArray[thisIndex] = { fileName: f.name, progress: 0 };

      this._awsService.s3Upload(f,
          (progress: { loaded: number, total: number }) => {
            this.uploadFileInfoArray[thisIndex].progress = progress.loaded/progress.total * 100;
            console.log(`${JSON.stringify(this.uploadFileInfoArray[thisIndex])}`); 
          },

          (result: any) => {
            this.uploadFileInfoArray[thisIndex].done = true;
            this.uploadFileInfoArray[thisIndex].error = null;
          },

          (error: any) => {
            this.uploadFileInfoArray[thisIndex].done = true;
            this.uploadFileInfoArray[thisIndex].error = error;
          }
        );

      index++;
    }

  }

  fileBrowserHandler(event: any) {
    this.fileDropped(event);
  }

  checkFileTypesValid(evt: any) {

    const items = (evt.dataTransfer.files && Object.keys(evt.dataTransfer.files).length > 0)
      ? evt.dataTransfer.files
      : evt.dataTransfer.items;

    return (!items) ? false : this.verifyFileItems(items);

  }

}
