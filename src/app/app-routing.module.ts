import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaincontentComponent } from './maincontent/maincontent.component';
import { UserloginComponent } from './userlogin/userlogin.component';

import { authGuard } from './routeguards/auth.guard'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'maincontent' },
  {
    path: 'maincontent',
    component: MaincontentComponent,
    canActivate: [ authGuard ],
  },
  {
    path: 'login',
    component: UserloginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
