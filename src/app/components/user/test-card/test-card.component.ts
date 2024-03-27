import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-test-card',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './test-card.component.html',
  styleUrl: './test-card.component.css'
})
export class TestCardComponent {
  @Input() examUser: any;
  status: any;
  icon: any;
  avatarImg: any;
  constructor(){

  }
}
