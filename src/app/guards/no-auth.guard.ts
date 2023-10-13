import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const noAuthGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLogged = await authService.isLogged();
  
  if (!isLogged) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
}
  
