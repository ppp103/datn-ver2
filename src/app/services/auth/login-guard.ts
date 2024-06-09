import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn, Router } from '@angular/router'; // Update this line

import { AuthService } from './auth.service';
import { CommonServiceShared } from '../base/common-service.service';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
  class LoginGuard {
    constructor(
      private authService: AuthService,
      private router : Router,
      private commonService: CommonServiceShared
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log(this.authService.isLoggedIn().subscribe((res: any) => {
      console.log(res);
    }));
    return this.authService.isLoggedIn().pipe(
    map(isLoggedIn => {
      console.log(isLoggedIn);
      if (isLoggedIn) {
        // this.router.navigate(['/home']);
        this.commonService.showeNotiResult('Bạn đã đăng nhập thành công', 2000);
        return false;
      } else {
        return true;
      }
    })
  );
}
  }
  export const IsLoginGuarded: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any => {
    return inject(LoginGuard).canActivate(route, state);
  }

