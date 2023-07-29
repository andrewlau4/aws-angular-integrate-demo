import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaincontentComponent } from './maincontent/maincontent.component';
import { UserloginComponent } from './userlogin/userlogin.component';

import { authGuard } from './routeguards/auth.guard'

import { LOGIN_PATH } from './constants';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'maincontent' },
  {
    path: 'maincontent',
    component: MaincontentComponent,
    canActivate: [ authGuard ],
    // children: [
    //   {
    //     path: '',
    //     pathMatch: 'full',
    //     redirectTo: 'textextract'
    //   },
    //   {
    //     path: 'textextract',
    //     component: TextExtractComponent
    //   }
    // ]
  },
  {
    path: LOGIN_PATH,
    component: UserloginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
