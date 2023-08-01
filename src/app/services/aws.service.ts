import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Auth, Hub, Storage } from 'aws-amplify';

import { LOGIN_PATH } from '../constants';

import { BehaviorSubject } from 'rxjs';

type S3KeyName = string | null;

@Injectable({
  providedIn: 'root'
})
export class AwsService implements OnDestroy {

  readonly pictureUploadCompleteEvent: BehaviorSubject<S3KeyName> = new BehaviorSubject<S3KeyName>(null);

  readonly amplify_auth_services: { handleSignUp: (formData: Record<string, any>) => Promise<any> } = {
    async handleSignUp(formData: Record<string, any>) {
      console.log(`handleSignUp  ${JSON.stringify(formData)} `);
      let { username, password, attributes } = formData;

      attributes["custom:subscription_level"] = "basic";

      return Auth.signUp({
        username,
        password,
        attributes,
        autoSignIn: {
          enabled: true,
        },
      });
    },
  };

  authenListenerUnSubscribe: (() => void) | null = null

  constructor(private _router: Router) {
    if (!this.authenListenerUnSubscribe) {
      this.authenListenerUnSubscribe = Hub.listen('auth',  ({payload}) => {
        console.log(`Amplify Hub auth payload ${JSON.stringify(payload)}`);
  
        if (payload.event == 'signIn' || payload.event == 'autoSignIn') {
          this._router.navigate(['']);
        } else if (payload.event == 'signOut') {
          this._router.navigate([ LOGIN_PATH ]);
        }
      });
    }
  }


  async checkUserLoggedInAndNavigate() {
    try {
      const user = await Auth.currentAuthenticatedUser();

      console.log("user already login, redirect to main page");

      this._router.navigate(['']);
    } catch (err) {
      console.log("user not login");
    }
  }

  async logout() {
    try {
      console.log('user signing out');
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  notifyPictureUploadCompleteEvent(s3KeyName: S3KeyName) {
    this.pictureUploadCompleteEvent.next(s3KeyName);
  }

  s3Upload(file: File, progressCallback: (progress: { loaded: number, total: number }) => void,
    completedCallback: (result: any) => void,
    errorCallback: (error: any) => void, 
  ) {
    
    Storage.put(
      file.name, file, 
      {
        level: 'private',
        contentType: file.type,
        progressCallback
      }
    )
    .then(result => {
      completedCallback(result);
      return result;
    })
    .then(
      (result) => 
        this.notifyPictureUploadCompleteEvent(file.name)
    )
    .catch((error) => {
      errorCallback(error);
      throw error;
    })
  }

  ngOnDestroy() {
    if (this.authenListenerUnSubscribe) {
      this.authenListenerUnSubscribe();
      this.authenListenerUnSubscribe = null;
    }
  }
}
