import { Component } from '@angular/core';
import { AwsService } from './services/aws.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aws-angular-integrate-demo';

  constructor(private _awsService: AwsService) {}

  logout() {
    this._awsService.logout();
  }
}
