import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  constructor(private authService: AuthService){

  }
  ngOnInit(): void {
    this.authService.returnSignIn();
    this.authService.returnUser();    
  }

}
