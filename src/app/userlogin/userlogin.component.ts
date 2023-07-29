import { Component, OnInit, OnDestroy } from '@angular/core';

import { Auth, Hub } from 'aws-amplify';

import { Router } from '@angular/router';

import { AwsService } from '../services/aws.service';


@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.scss']
})
export class UserloginComponent implements OnInit, OnDestroy {

  authenInitialState: "signIn" | "signUp" | "resetPassword" = "signIn"; 

  formFields = {
    signUp: {
      email: {
        order:1
      },
      username: {
        order:2
      },
      password: {
        order: 3
      },
      confirm_password: {
        order: 4
      }
    },
  };

  amplify_auth_services: { handleSignUp: (formData: Record<string, any>) => Promise<any> } = {
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

  constructor(private _router: Router, private _awsService: AwsService) {}

  ngOnInit(): void {
    console.log("calling checkUserLoggedIn");
    this.checkUserLoggedIn();

  }

  ngOnDestroy(): void {
    if (this.authenListenerUnSubscribe) {
      this.authenListenerUnSubscribe();
      this.authenListenerUnSubscribe = null;
    }
  }

  async checkUserLoggedIn() {
    try {
      const user = await Auth.currentAuthenticatedUser();

      console.log("user already login, redirect to main page");

      this._router.navigate(['']);
    } catch (err) {
      console.log("user not login");

      this.authenListenerUnSubscribe = Hub.listen('auth',  ({payload}) => {
        console.log(`Amplify Hub auth payload ${JSON.stringify(payload)}`);
  
        if (payload.event == 'signIn') {
          this._router.navigate(['']);
        }
      });
    }

  }

}
