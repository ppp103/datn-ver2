import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  isLogined: any;
  user: any;
  defaultUrl = '/user';

  constructor(
    private authService: AuthService
  ){

  }

  ngOnInit() {
    this.isLogined = this.authService.isLoggedIn();
    this.user = this.authService.getUserDataFromLocal();
    console.log(this.user);
  }


}
