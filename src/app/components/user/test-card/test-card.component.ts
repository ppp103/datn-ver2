import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-test-card',
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
