import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChildFn, CanActivateFn, Router } from '@angular/router'; // Update this line

import { AuthService } from './auth.service';
import { CommonServiceShared } from '../base/common-service.service';
@Injectable({
  providedIn: 'root'
})
  class AdminGuard {
    constructor(
      private authService: AuthService,
      private router : Router,
      private commonService: CommonServiceShared
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (this.authService.isLoggedIn()) {
        return true;
      } else {
        this.commonService.showeNotiResult('Vui lòng đăng nhập trước', 2000)
        this.router.navigate([`/sign-in`]);
        return false;
      }
    }
  }
  export const IsGuarded: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any => {
    return inject(AdminGuard).canActivate(route, state);
  }

