import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  user: any;
  isAdmin: any;
  constructor(
    private authService : AuthService
  ){
    this.user = this.authService.getUserDataFromLocal();
    this.authService.isAdmin().subscribe((res: any) => {
      console.log(res);
      this.isAdmin = res;
    });
  }
}
