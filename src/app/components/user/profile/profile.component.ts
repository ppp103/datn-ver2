import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';
import { CommonServiceShared } from '../../../services/base/common-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userProfile: any;
  togglePwd: any;
  toggleEmail: any;
  toggleAvatar: any;
  user: any;
  
  constructor(
    private authService : AuthService,
    private userService: UserService,
    private commonService: CommonServiceShared
  ){
    this.user = this.authService.getUserDataFromLocal();
  }

  updatePassword(event: any){
    this.userService.updatePassword(
      { id: this.user.Id, 
        oldPassword: event.currentPassword, 
        newPassword: event.newPassword
      }).subscribe({
        next: (res) => {
            this.commonService.showeNotiResult(res.message + 'Vui lòng đăng nhập lại!', 2000);
            if(res.flag){
              setTimeout(() => {
                this.authService.logout();
              }, 3000)
            }
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
  }

  getAvatarUpload(e: any){
    console.log(e);
  }
} 
