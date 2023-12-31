import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isLogged = await authService.isLogged();
  if(!isLogged){
    router.navigate(['/login']);
  }
  return isLogged;
};
