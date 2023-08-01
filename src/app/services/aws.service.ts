import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Auth, Hub, Storage } from 'aws-amplify';
import { Predictions } from '@aws-amplify/predictions';

import { LOGIN_PATH } from '../constants';

import { BehaviorSubject } from 'rxjs';

type S3KeyName = string | null;

type S3PictureInfo = {
  pictureUrl: string,
  s3KeyName: string
}

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
    this.authenListenerUnSubscribe = Hub.listen('auth',  ({payload}) => {
      console.log(`Amplify Hub auth payload ${JSON.stringify(payload)}`);

      if (payload.event == 'signIn' || payload.event == 'autoSignIn') {
        this._router.navigate(['']);
      } else if (payload.event == 'signOut') {
        this._router.navigate([ LOGIN_PATH ]);
      }
    });
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
    })
  }

  async s3ListAllFiles(callback: (pictureInfo: S3PictureInfo[]) => void) {
    let pictureListResult = await Storage.list('', {
      level: 'private'
    });

    let pictureKeys = pictureListResult.results.map(
      item => item.key
    ).filter(
      //this filter is only used to convert type  (string | undefined)[]  into string[]
      (value): value is string => { return !!value } );

    let pictureUrls = await Promise.all (pictureKeys.map(
        value =>
          Storage.get(value, {
              level: "private",
              validateObjectExistence: true
            }).then(
              (resultUrl) => {
                return { pictureUrl: resultUrl, s3KeyName: value };
              }
            )
          
        ) );

    callback(pictureUrls);
  }

  async s3GetFile(s3KeyName: string, callback: (pictureInfo: S3PictureInfo) => void) {
    let pictureInfo = await Storage.get(s3KeyName, {
              level: "private",
              validateObjectExistence: true
            }).then(
              (resultUrl) => {
                return { pictureUrl: resultUrl, s3KeyName: s3KeyName };
              }
            );

    callback(pictureInfo);
  }

  async extractTextFromPic(s3KeyName: string, callback: (result: string) => void) {
    let identifyResult = await Predictions.identify({
            text: {
              source: {
                key: s3KeyName,
                level: 'private'
              }
            }
          });

    //https://docs.amplify.aws/lib/predictions/identify-text/q/platform/js/#identify-plain-text
    let {
      text: {
        fullText, // String
        lines, // Array of String ordered from top to bottom
      }
    } = identifyResult;

    callback(fullText);
  }

  ngOnDestroy() {
    if (this.authenListenerUnSubscribe) {
      this.authenListenerUnSubscribe();
      this.authenListenerUnSubscribe = null;
    }
  }
}
