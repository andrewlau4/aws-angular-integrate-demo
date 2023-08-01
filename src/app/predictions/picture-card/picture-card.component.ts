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

  constructor(private _awsService: AwsService) {}

  extractText() { 
    this._awsService.extractTextFromPic(this.s3BucketKey!, 
      (resultText) => {
        if (resultText) {
          this.analysisResultText = resultText;
        }
      }
    );
  }

}
