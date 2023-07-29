import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { environment } from './environments/environment';

import { Amplify } from 'aws-amplify';

//need also to do these setup steps:
//  https://ui.docs.amplify.aws/angular/getting-started/troubleshooting#global-and-process-shim
//  https://ui.docs.amplify.aws/angular/getting-started/installation
Amplify.configure(environment.awsConfig);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
