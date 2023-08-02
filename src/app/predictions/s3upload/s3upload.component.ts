import { Component } from '@angular/core';

import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import { AwsService } from '../../services/aws.service';

import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';


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

  constructor(private _awsService: AwsService, private _dialog: MatDialog) {}

  fileDropped(files: any) {
    this.uploadFileInfoArray = [];

    if (!files || files.length == 0) {
      return;
    }

    if (!this.verifyFileItems(files)) {
      this.openWrongFileTypeDialog();
      return;
    }

    let index = 0;
    for (const f of files) {
      let thisIndex = index;
      let thisUploadFileInfoArray = this.uploadFileInfoArray;

      thisUploadFileInfoArray[thisIndex] = { fileName: f.name, progress: 0 };

      this._awsService.s3Upload(f,
          ({ loaded, total}) => {
            this.uploadFileInfoArray[thisIndex].progress = loaded/total * 100;
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
    this.fileDropped(event.target.files);
  }

  checkFileTypesValid(evt: any) {

    const items = (evt.dataTransfer.files && Object.keys(evt.dataTransfer.files).length > 0)
      ? evt.dataTransfer.files
      : evt.dataTransfer.items;

    return (!items) ? false : this.verifyFileItems(items);

  }

  openWrongFileTypeDialog() {
    const dialogRef = this._dialog.open(AlertDialogComponent, {
      data: { message: "You can only upload image files. The file(s) you tried to upload are not image files" }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        console.log(`dialog closed ${result}`);
      }
    )
  }
}
