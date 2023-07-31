import { Component } from '@angular/core';

@Component({
  selector: 'app-s3upload',
  templateUrl: './s3upload.component.html',
  styleUrls: ['./s3upload.component.scss']
})
export class S3uploadComponent {

  dragItemValidityCheckFn = (item: any) =>  item && item.type && (item.type.startsWith('image') || item.type.startsWith('img'));

  fileDropped(event: any) {

  }

  fileBrowserHandler(event: any) {

  }
}
