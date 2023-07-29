import { Component, OnInit, OnDestroy } from '@angular/core';

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

  constructor(private _router: Router, public awsService: AwsService) {}

  ngOnInit(): void {
    console.log("calling checkUserLoggedIn");
    this.awsService.checkUserLoggedInAndNavigate();
  }

  ngOnDestroy(): void {
  }

}
