import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Auth, Hub } from 'aws-amplify';


@Injectable({
  providedIn: 'root'
})
export class AwsService implements OnDestroy {

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

  constructor(private _router: Router) { }


  async checkUserLoggedInAndNavigate() {
    if (!this.authenListenerUnSubscribe) {
      this.authenListenerUnSubscribe = Hub.listen('auth',  ({payload}) => {
        console.log(`Amplify Hub auth payload ${JSON.stringify(payload)}`);
  
        if (payload.event == 'signIn' || payload.event == 'autoSignIn') {
          console.log(`navigate to...`)
          this._router.navigate(['']);
        } else if (payload.event == 'signOut') {
          this._router.navigate(['login']);
        }
      });
    }

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
      //this._router.navigate(['']);
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  ngOnDestroy() {
    if (this.authenListenerUnSubscribe) {
      this.authenListenerUnSubscribe();
      this.authenListenerUnSubscribe = null;
    }
  }
}
