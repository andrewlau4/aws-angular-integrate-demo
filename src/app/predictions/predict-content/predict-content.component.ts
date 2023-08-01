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

  ngOnInit() {
    const listAllPics_Binded = this.listAllPics.bind(this);
    const loadPicFromS3_Binded = this.loadPicFromS3.bind(this);

    this.picUploadCompletedSubscription = this._awsService
      .pictureUploadCompleteEvent.subscribe(
        s3KeyName => {
          if (s3KeyName == null) {
            listAllPics_Binded();
          } else {
            loadPicFromS3_Binded(s3KeyName);
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

  async listAllPics() {

  }

  async loadPicFromS3(s3KeyName: string) {

  }



}
