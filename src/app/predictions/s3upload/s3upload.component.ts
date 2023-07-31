import { Component } from '@angular/core';

import { AwsService } from '../../services/aws.service';

import { Storage } from 'aws-amplify';

type UploadFileInfo = {
  fileName?: string,
  progress?: number,
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

      thisUploadFileInfoArray[thisIndex] = {};
      thisUploadFileInfoArray[thisIndex].fileName = f.name;
      thisUploadFileInfoArray[thisIndex].progress = 0;

      Storage.put(
        f.name, f, 
        {
          level: 'private',
          contentType: f.type,

          progressCallback(progress) {
            thisUploadFileInfoArray[thisIndex].progress = progress.loaded/progress.total * 100;
            console.log(`${JSON.stringify(thisUploadFileInfoArray[thisIndex])}`); 
          }
        }
      )
      .then(value => {
        thisUploadFileInfoArray[thisIndex].done = true;
        thisUploadFileInfoArray[thisIndex].error = null;
        this._awsService.notifyPictureUploadEvent();
        console.log(`${JSON.stringify(thisUploadFileInfoArray[thisIndex])}`); 
      })
      .catch((error) => {
        thisUploadFileInfoArray[thisIndex].done = true;
        thisUploadFileInfoArray[thisIndex].error = error;
        console.log(`${f.name} Uploaded ${index} promise error ${JSON.stringify(error)}`);
        console.log(`${JSON.stringify(thisUploadFileInfoArray[thisIndex])}`); 
        throw error;
      })

      index++;
    }

  }

  fileBrowserHandler(event: any) {

  }

  checkFileTypesValid(evt: any) {

    const items = (evt.dataTransfer.files && Object.keys(evt.dataTransfer.files).length > 0)
      ? evt.dataTransfer.files
      : evt.dataTransfer.items;

    return (!items) ? false : this.verifyFileItems(items);

  }

}
