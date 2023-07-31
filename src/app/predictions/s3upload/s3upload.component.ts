import { Component } from '@angular/core';

@Component({
  selector: 'app-s3upload',
  templateUrl: './s3upload.component.html',
  styleUrls: ['./s3upload.component.scss']
})
export class S3uploadComponent {

  readonly invalidCssClass = "turn-red";
  readonly validCssClass = "turn-green";


  fileDropped(event: any) {

  }

  fileBrowserHandler(event: any) {

  }

  checkFileTypesValid(evt: any) {

    const items = (evt.dataTransfer.files && Object.keys(evt.dataTransfer.files).length > 0)
      ? evt.dataTransfer.files
      : evt.dataTransfer.items;

    const verifyType = (item: any): boolean => {
      console.log(`checking ${item.type}`);

      return item && item.type && (item.type.startsWith('image') || item.type.startsWith('img'));
    }
    
    const verifyItems = (items: any): boolean => {
      console.log(`items: ${JSON.stringify(items)}`)
      for (const i of items) {
        if (!verifyType(i)) {
          console.log(`item ${i} is not image`);
          return false;
        }
      }
      console.log("all items are images")
      return true;
    }

    return (!items) ? false : verifyItems(items);

  }

}
