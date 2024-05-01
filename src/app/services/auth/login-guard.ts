import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn, Router } from '@angular/router'; // Update this line

import { AuthService } from './auth.service';
import { CommonServiceShared } from '../base/common-service.service';
@Injectable({
  providedIn: 'root'
})
  class LoginGuard {
    constructor(
      private authService: AuthService,
      private router : Router,
      private commonService: CommonServiceShared
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (this.authService.isLoggedIn()) {
        this.router.navigate([`/home`])
        this.commonService.showeNotiResult('Bạn đã đăng nhập thành công', 2000);
        return false;
      } else {
        return true;
      }
    }
  }
  export const IsLoginGuarded: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any => {
    return inject(LoginGuard).canActivate(route, state);
  }

