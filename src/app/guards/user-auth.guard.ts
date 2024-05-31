import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const userAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authenticated()) {
    if (isTokenExpired()) {
      authService.logout();
      router.navigate(['/login']);
      return false;
    }

    return true;
  }

  router.navigate(['/login']);
  return false;
};

const isTokenExpired = () => {
  const authService = inject(AuthService);
  const token = authService.token;
  const payload = authService.getPayload(token);
  const exp = payload.exp;
  const now = new Date().getTime() / 1000;
  return (now > exp);
}
