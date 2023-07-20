import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  console.log(`authGuard navigate to login`);
  return router.navigate(['login']);

  //return true;
};
