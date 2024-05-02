import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

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
    private authService : AuthService
  ){
    this.user = this.authService.getUserDataFromLocal();
  }

  updatePassword(event: any){
    console.log(event);
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

  
}
