import { Component, Input } from '@angular/core';
import { AwsService } from 'src/app/services/aws.service';

@Component({
  selector: 'app-picture-card',
  templateUrl: './picture-card.component.html',
  styleUrls: ['./picture-card.component.scss']
})
export class PictureCardComponent {

  @Input()
  pictureUrl?: string

  @Input({ required: true })
  s3BucketKey?: string

  analysisResultText = "Press the buttons to analyse the image";

  isWaiting = false;

  constructor(private _awsService: AwsService) {}

  extractText() { 
    this.isWaiting = true
    this._awsService.extractTextFromPic(this.s3BucketKey!, 
      (resultText) => {
        if (resultText) {
          this.analysisResultText = resultText;
        }
        this.isWaiting = false;
      }
    );
  }

  identifyEntities() {
    this.isWaiting = true
    this._awsService.identifyEntitiesFromPic(this.s3BucketKey!, 
      (resultText) => {
        if (resultText) {
          this.analysisResultText = resultText;
        }
        this.isWaiting = false;
      }
    );
  }

}
