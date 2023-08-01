import { Component, Input } from '@angular/core';

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

  extractText() { 
  }

}
