import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { AwsService } from 'src/app/services/aws.service';

type uploadedPicInfo = {
  s3KeyName?: string
}

@Component({
  selector: 'app-predict-content',
  templateUrl: './predict-content.component.html',
  styleUrls: ['./predict-content.component.scss']
})
export class PredictContentComponent implements OnInit, OnDestroy {

  picUploadCompletedSubscription?: Subscription;

  constructor(private _awsService: AwsService) {}

  s3PicturesKeyToUrlMap: { [s3key: string]: string } = { }

  ngOnInit() {
    this.picUploadCompletedSubscription = this._awsService
      .pictureUploadCompleteEvent.subscribe(
        s3KeyName => {
          if (s3KeyName == null) {
            this.listAllPics();
          } else {
            this.loadPicFromS3(s3KeyName);
          }
        }
    );
  }

  ngOnDestroy() {
    if (this.picUploadCompletedSubscription) {
      this.picUploadCompletedSubscription.unsubscribe();
      this.picUploadCompletedSubscription = undefined;
    }
  }

  listAllPics() {
    this._awsService.s3ListAllFiles(
      (pictures) => {
        this.s3PicturesKeyToUrlMap = {};
        pictures.forEach(
          item => this.s3PicturesKeyToUrlMap[item.s3KeyName] = item.pictureUrl
        )
      }
    );
  }

  loadPicFromS3(s3KeyName: string) {
    this._awsService.s3GetFile(s3KeyName,
      (item) => {
        this.s3PicturesKeyToUrlMap[item.s3KeyName] = item.pictureUrl
      }
    );

  }



}
