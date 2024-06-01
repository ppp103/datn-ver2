import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';
import { CommonServiceShared } from '../../../services/base/common-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UpdatePasswordComponent } from '../../shared/update-profile/update-password/update-password.component';
import { UpdateEmailComponent } from '../../shared/update-profile/update-email/update-email.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements AfterViewInit{

  userProfile: any;
  togglePwd: any;
  toggleEmail: any;
  toggleAvatar: any;
  user: any;
  hasLoaded: any = false;

  @ViewChild('password') password!: UpdatePasswordComponent;
  @ViewChild('email') email!: UpdateEmailComponent;
  constructor(
    private authService : AuthService,
    private userService: UserService,
    private commonService: CommonServiceShared
  ){
    this.user = this.authService.getUserDataFromLocal();
  }
  ngAfterViewInit(): void {
    this.hasLoaded = true;
    console.log(this.hasLoaded);
  }

  updatePassword(event: any){
    this.userService.updatePassword(
      { id: this.user.Id, 
        oldPassword: event.currentPassword, 
        newPassword: event.newPassword
      }).subscribe({
        next: (res) => {
            this.commonService.showeNotiResult(res.message, 2000);
            if(this.password){
              console.log(this.password);
              this.password.clearForm();
            }
            // if(res.flag){
            //   setTimeout(() => {
            //     this.authService.logout();
            //   }, 3000)
            // }
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          this.commonService.showeNotiResult(
            'Lỗi hệ thống! Vui lòng thử lại sau!',
            2000
          );
        },
      }
    );
  }

  toggleChangePwd() {
    this.toggleEmail = false;
    this.toggleAvatar = false;
    this.togglePwd = true;
  }

  toggleUpdateEmail() {
    this.togglePwd = false;
    this.toggleAvatar = false;
    this.toggleEmail = true;

  }

  toggleChangeAvatar() {
    this.togglePwd = false;
    this.toggleEmail = false;
    this.toggleAvatar = true;

  }

  updateEmail(e: any){
    console.log(e);
    this.userService.updateEmail(
    { id: this.user.Id, 
      email: e.email,
      password: e.password
    }).subscribe({
        next: (res) => {
            this.commonService.showeNotiResult(res.message, 2000);
            this.email.clearForm();
            // if(res.flag){
            //   setTimeout(() => {
            //     this.authService.logout();
            //   }, 3000)
            // }
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          this.commonService.showeNotiResult(
            'Lỗi hệ thống! Vui lòng thử lại sau!',
            2000
          );
        },
      }
    );
  }

  getAvatarUpload(e: any){
    console.log(e);
  }
} 
