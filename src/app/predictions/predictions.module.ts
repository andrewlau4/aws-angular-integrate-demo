import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PredictionsRoutingModule } from './predictions-routing.module';
import { S3uploadComponent } from './s3upload/s3upload.component';
import { PictureCardComponent } from './picture-card/picture-card.component';
import { PredictContentComponent } from './predict-content/predict-content.component';


@NgModule({
  declarations: [
    S3uploadComponent,
    PictureCardComponent,
    PredictContentComponent
  ],
  imports: [
    CommonModule,
    PredictionsRoutingModule
  ]
})
export class PredictionsModule { }
