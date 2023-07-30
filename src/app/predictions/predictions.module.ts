import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatIconModule} from '@angular/material/icon';

import { PredictionsRoutingModule } from './predictions-routing.module';
import { S3uploadComponent } from './s3upload/s3upload.component';
import { PictureCardComponent } from './picture-card/picture-card.component';
import { PredictContentComponent } from './predict-content/predict-content.component';
import { DragndropUploadDirective } from './directive/dragndrop-upload.directive';


@NgModule({
  declarations: [
    S3uploadComponent,
    PictureCardComponent,
    PredictContentComponent,
    DragndropUploadDirective
  ],
  imports: [
    CommonModule,
    PredictionsRoutingModule,

    MatIconModule
  ]
})
export class PredictionsModule { }
