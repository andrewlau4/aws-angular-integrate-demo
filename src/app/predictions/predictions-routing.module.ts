import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PredictContentComponent } from './predict-content/predict-content.component';

const routes: Routes = [
  {
    path: '',
    component: PredictContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PredictionsRoutingModule { }
