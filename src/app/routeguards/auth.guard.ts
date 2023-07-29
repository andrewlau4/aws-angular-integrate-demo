import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { Auth } from 'aws-amplify';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  console.log(`authGuard check`);
  return Auth.currentAuthenticatedUser().then(
          (user) => {
            console.log("authGuard checked user already login"); 
            return true;
          }
        ).catch( err => {
          console.log("authGuard checked user has not login"); 
          return router.navigate(['login']);
        });

};
