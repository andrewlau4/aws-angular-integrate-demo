import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
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

    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,

    AmplifyAuthenticatorModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
