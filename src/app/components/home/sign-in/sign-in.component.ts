import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  // standalone: false,
  // imports: [CommonModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  openTab: any = 1;

  changeTab(){
    this.openTab = 2;
    if(this.openTab == 2){
      console.log(this.openTab);
    }
  }
}
