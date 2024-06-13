import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  toggleUserDropdown = false;

  constructor(private authService: AuthService) {
    
  }

  ngOnInit(): void {
  }

  signOut() {
    this.authService.logout();
  }


}
