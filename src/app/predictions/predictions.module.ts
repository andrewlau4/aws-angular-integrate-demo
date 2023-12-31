import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

import { PredictionsRoutingModule } from './predictions-routing.module';
import { S3uploadComponent } from './s3upload/s3upload.component';
import { PictureCardComponent } from './picture-card/picture-card.component';
import { PredictContentComponent } from './predict-content/predict-content.component';
import { DragndropUploadDirective } from './directive/dragndrop-upload.directive';
import { FileUploadProgressComponent } from './file-upload-progress/file-upload-progress.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';


@NgModule({
  declarations: [
    S3uploadComponent,
    PictureCardComponent,
    PredictContentComponent,
    DragndropUploadDirective,
    FileUploadProgressComponent,
    AlertDialogComponent
  ],
  imports: [
    CommonModule,
    PredictionsRoutingModule,

    MatIconModule,
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ]
})
export class PredictionsModule { }
