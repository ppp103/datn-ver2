import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';
import { CommonServiceShared } from '../../../services/base/common-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UpdatePasswordComponent } from '../../shared/update-profile/update-password/update-password.component';
import { UpdateEmailComponent } from '../../shared/update-profile/update-email/update-email.component';
import { UpdateAvatarComponent } from '../../shared/update-profile/update-avatar/update-avatar.component';

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
  previewUrl: string | ArrayBuffer | null = null;
  defaultImg = 'https://localhost:7253/images/tests/avatar-default.png'

  @ViewChild('password') password!: UpdatePasswordComponent;
  @ViewChild('email') email!: UpdateEmailComponent;
  @ViewChild('avatar') avatar!: UpdateAvatarComponent;
  formData!: FormData;

  constructor(
    private authService : AuthService,
    private userService: UserService,
    private commonService: CommonServiceShared
  ){
    this.user = this.authService.getUserDataFromLocal();
    this.userService.getUserById(this.user.Id).subscribe((res: any) => {
      // this.user = res;
      console.log(this.user);
      if(res.imgLink !== '' && res.imgLink){
        // this.defaultImg = this.user.ImgLink;
        this.previewUrl = res.imgLink;
      }
    })
    console.log(typeof this.user);
  }

  ngAfterViewInit(): void {
    this.hasLoaded = true;
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
              this.password.clearForm();
            }
        },
        error: (error: HttpErrorResponse) => {
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
        next: async (res) => {
          this.commonService.showeNotiResult(res.message, 2000);
          this.email.clearForm();
          this.authService.reloadUserInfo();
          this.user = this.authService.getUserDataFromLocal();
        },
        error: (error: HttpErrorResponse) => {
          this.commonService.showeNotiResult(
            'Lỗi hệ thống! Vui lòng thử lại sau!',
            2000
          );
        },
      }
    );
  }

  getAvatarUpload(file: any){
    console.log(file);
    if(file){
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveImg(e: any){
    console.log(e);
    this.formData = new FormData();
    this.formData.append("Id", this.user.Id);
    this.formData.append("File", e);

    this.userService.updateAvatarFile(this.formData).subscribe({
      next: (res) => {
        if(res.flag){
          this.commonService.showeNotiResult(res.message, 2000);
          this.togglePwd = false;
          this.toggleAvatar = false;
          this.toggleEmail = false;
        }else{
          this.commonService.showeNotiResult(res.message, 2000);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.commonService.showeNotiResult('Chỉnh sửa ảnh thất bại', 2000);
      },
      complete: () => {
        // this.commonService.showeNotiResult('Chỉnh sửa ảnh thành công', 2000);
        // this.returnList();
      },
    })
  }
} 
