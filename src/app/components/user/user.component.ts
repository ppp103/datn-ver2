import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  toggledMenu: any;
  user: any;
  constructor(
    private authService : AuthService
  ){
    this.user = this.authService.getUserDataFromLocal();
  }
  toggleMenu(){
    this.toggledMenu = !this.toggledMenu;

  }
  logOut(){
    this.authService.logout();
  }
}
