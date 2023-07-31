import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';

import { UserloginComponent } from './userlogin/userlogin.component';
import { MaincontentComponent } from './maincontent/maincontent.component';

import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';


@NgModule({
  declarations: [
    AppComponent,
    UserloginComponent,
    MaincontentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatToolbarModule, 
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,

    HttpClientModule,
    ReactiveFormsModule,

    AmplifyAuthenticatorModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
