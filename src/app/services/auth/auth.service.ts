import { Injectable } from '@angular/core';
import { RepositoryEloquentService } from '../base/base-service.service';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from '../token-storage/token-storage.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { UserService } from '../user/user.service';
import { CommonServiceShared } from '../base/common-service.service';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { Observable, map, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService extends RepositoryEloquentService {
  constructor(public override httpClient: HttpClient,
    private localStorageService : LocalStorageService,
    private userService: UserService,
    private commonService: CommonServiceShared,
    private router : Router
  ) {
    super();
    this.setServiceInfo({
      httpClient,
      apiUrl: `${environment.apiEndPoint}User`,
    });
  }

  public checkBeDeleted(id: number) {
    return 'ok';
  }

  public login(param: any){
    this.userService.login(param).subscribe({
      next: (res: any) => {
        // Thành công => Lưu access token vào localStorage
        // Giải mã token => Lấy ra thông tin và lưu thông tin người dùng
        localStorage.setItem('ACCESS_TOKEN', res.token)
        const decodedToken: any = jwtDecode(res.token);
        this.localStorageService.setItem('USER_PROFILE', decodedToken);
        // this.router.navigate([`/user`])
        window.location.href = '/user'
      },
      error: (error: any) => {
        console.log(error);
        this.commonService.showeNotiResult(error.error.message, 2000);
      }
    });
  }

  public reloadUserInfo(){  
    const userLocal = this.getUserDataFromLocal();
    this.userService.getUserById(+userLocal.Id).subscribe(
        (res) => {
          const convertResult: any = {
            Id: res.id,
            Name: res.userName,
            Email: res.email
          }
          this.localStorageService.setItem('USER_PROFILE', convertResult);
        }
      );
  }

  public register(param: any){
    this.userService.registerUser(param).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.commonService.showeNotiResult(error.error.message, 2000);
      },
      complete: () => {
        this.commonService.showeNotiResult('Đăng ký thành công', 2000);
        
        setTimeout(() => {
          window.location.href = "/sign-in";
        }, 1000);
      }
    });
  }

  isLoggedIn(): Observable<boolean> {
    const userLocal = this.getUserDataFromLocal();
    console.log(userLocal);
    if(userLocal){
      return this.userService.getUserById(userLocal.Id).pipe(
        map(res => {
          if(res){
            return true;
          }
          return false;
        })
      );
    } 
    else {
      return of(false);
    }
  }

  isAdmin(){
    const userLocal = this.getUserDataFromLocal();
    if(userLocal){
      return this.userService.getUserById(userLocal.Id).pipe(
        map(res => {
          if(res && res.Role) return true
          else return false 
        })
      )
    }else{
      return of(false);
    }
  }

  returnSignIn(){
    const userLocal = this.getUserDataFromLocal();
    if(!userLocal){
      this.router.navigate(['/sign-in']);
      this.commonService.showeNotiResult('Bạn phải đăng nhập trước', 2000);
    }
  }

  returnUser(){
    const userLocal = this.getUserDataFromLocal();
    console.log(userLocal.Role);
    if(userLocal.Role == 0){
      // this.router.navigate(['/sign-in']);
      this.router.navigate(['/user']);
      this.commonService.showeNotiResult('Bạn không có quyền truy cập', 2000);
    }
  }

  getAccessToken(): string {
    const accessToken = this.localStorageService.getItem('ACCESS_TOKEN');
    return accessToken ? accessToken : null;
  }

  logout(){
    this.localStorageService.removeAll();
    this.commonService.showeNotiResult('Đăng xuất thành công', 2000);
    window.location.href = '/sign-in'
  }

  getUserDataFromLocal(){
    return this.localStorageService.getItem('USER_PROFILE');
  }
}